package net.inet_lab.starwars;

import com.googlecode.lanterna.TerminalSize;
import com.googlecode.lanterna.graphics.TextGraphics;
import com.googlecode.lanterna.input.KeyStroke;
import com.googlecode.lanterna.input.KeyType;
import com.googlecode.lanterna.terminal.Terminal;

import java.io.IOException;
import java.util.*;

public class SWGame {

    // Terminal data
    private final Terminal term;
    private final TextGraphics g;
    private final int X, Y;

    // Game options
    private final int ship_max_v = 3;
    private final String ship_img = "(****)";
    private final double fps = 5;
    private final int status_lines = 1;
    private final String[] mars_img = {"/***\\", "\\***/"};
    private final int mars_strip = 5;
    private final int mars_num = 5;
    private final int mars_total = 20;
    private final int ship_h = 4;
    private final double bomb_freq = 0.02;

    // random generator
    private final Random rand = new Random ();

    // runtime data
    private int gt;
    private int ship_x;
    private int ship_v;
    final private Mars[] mars_a = new Mars[mars_num];
    final private LinkedList<Bomb> bombs = new LinkedList<>();
    final private LinkedList<Missile> missiles = new LinkedList<>();

    class Missile {
        double x;
        int y;
        final double v;
        public Missile(final int x, final int y, final double v) {
            this.v = v;
            this.x = x + 0.5;
            this.y = y;
        }

        public boolean move() {
            clear ();

            y --;
            x += v;
            if (y < 0)
                return false;
            put((int) x, y, '^');
            return true;
        }

        public int get_pos () {
            return (int)x * Y + y;
        }

        public void clear () {
            put((int) x, y, ' ');
        }
    }

    class Bomb {
        int y;
        final int x;
        public Bomb(final int x, final int y) {
            this.x = x;
            this.y = y;
        }

        public boolean move () {
            clear ();
            y ++;
            if (y >= Y)
                return false;

            put(x, y, 'o');
            return true;
        }

        public int get_pos () {
            return x * Y + y;
        }

        public void clear () {
            put(x, y, ' ');
        }
    }

    class Mars {
        int t, x, v, tx;
        final int y;
        public Mars () {
            t = 0;
            if (rand.nextBoolean()) {
                x = 0;
                v = 1;
            }
            else {
                x = X - 1 - mars_img.length;
                v = -1;
            }
            tx = 10 + rand.nextInt(10);
            y = rand.nextInt(mars_strip);
        }

        public boolean move() {
            final int L = mars_img[0].length();
            clear();

            x += v;
            t += 1;

            if (x >= X || x <= -L)
                return false;

            if (t >= tx) {
                tx = t + 10 + rand.nextInt(10);
                v = rand.nextBoolean()?1:-1;
            }

            put(x, y, mars_img[t % mars_img.length]);
            flush();

            if (rand.nextDouble() < bomb_freq)
                drop_bomb ();

            return true;
        }

        public void clear () {
            final int L = mars_img[0].length();
            put(x, y, " ".repeat(L));
        }

        public void drop_bomb() {
            final int bx = x + mars_img[0].length()/2;
            if (bx >= 0 && bx < X-1)
                bombs.add(new Bomb(bx, y));
        }
    }

    public SWGame(final Terminal terminal, final TextGraphics textGraphics) throws IOException {
        term = terminal;
        g = textGraphics;

        final TerminalSize s = term.getTerminalSize();
        X = s.getColumns();
        Y = s.getRows() - status_lines;
    }

    private void msg(String s) {
        if (status_lines > 0) {
            put(0, Y, " ".repeat(X));
            put(0, Y, s);
            flush();
        }
    }

    private void flush() {
        try {
            term.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void put(final int x, final int y, final char c) {
        g.putString(x, y, String.valueOf(c));
    }

    private void put(final int x, final int y, final String s) {
        g.putString(x, y, s);
    }

    public void start() throws InterruptedException, IOException {
        init();

        while(true) {
            gt ++;

            KeyStroke key = term.pollInput();
            if (key != null) {
                KeyType tkey = key.getKeyType();
                Character tchar = key.getCharacter();

                if (tkey == KeyType.Escape || (tchar != null && tchar == 'q'))
                    break;
                else if (ship_v < ship_max_v && tkey == KeyType.ArrowRight) {
                    ship_v++;
                    msg("Speed " + ship_v);
                }
                else if (ship_v > -ship_max_v && tkey == KeyType.ArrowLeft) {
                    ship_v--;
                    msg("Speed " + ship_v);
                }
                else if (tchar != null && tchar == ' ')
                    missiles.add(new Missile(ship_x, Y - ship_h, ship_v/4.0));
            }

            move ();
            Thread.sleep((long)(1000/fps));
        }
    }

    public void move () {
        final int L0 = ship_img.length() / 2;
        final int L1 = X - 1 - ship_img.length() + L0;

        draw_ship(true);
        ship_x += ship_v;

        if (ship_x < L0) {
            ship_x = 2 * L0 - ship_x;
            ship_v *= -1;
        }
        else if (ship_x > L1) {
            ship_x = 2 * L1 - ship_x;
            ship_v *= -1;
        }

        draw_ship(false);
        flush();

        for(int ii = 0; ii < mars_a.length; ii ++) {
            if (mars_a[ii] == null) {
                if (gt > 20)
                    mars_a[ii] = new Mars();
            }
            else if (!mars_a[ii].move()) {
                mars_a[ii] = null;
            }
        }

        bombs.removeIf(bomb -> !bomb.move());
        missile_x_bomb();
        missiles.removeIf(missile -> !missile.move());
        missile_x_bomb();

        missile_x_mars ();
    }

    private void missile_x_mars () {
        missiles.removeIf(missile -> {
            if (missile.y >= mars_strip)
                return false;

            for (int ii = 0; ii < mars_a.length; ii++)
                if (mars_a[ii] != null &&
                        mars_a[ii].y == missile.y &&
                        (int)missile.x >= mars_a[ii].x &&
                        (int)missile.x < mars_a[ii].x + mars_img[0].length()) {

                    mars_a[ii].clear();
                    mars_a[ii] = null;

                    return true;
                }

            return false;
        });
    }

    private void missile_x_bomb() {
        Set<Integer> c_bombs = new HashSet<>();
        for (Bomb bomb : bombs)
            c_bombs.add(bomb.get_pos());
        Set<Integer> c_missiles = new HashSet<>();
        for (Missile missile: missiles)
            c_missiles.add(missile.get_pos());

        c_missiles.retainAll(c_bombs);

        bombs.removeIf(bomb -> {
            boolean rem = c_missiles.contains(bomb.get_pos());
            if (rem)
                bomb.clear();
            return rem;
        });
        missiles.removeIf(missile -> {
            boolean rem = c_missiles.contains(missile.get_pos());
            if (rem)
                missile.clear ();
            return rem;
        });
    }

    private void draw_ship(final boolean erase) {
        final int L = ship_img.length();
        put(ship_x -  L/2, Y - ship_h, erase?" ".repeat(L):ship_img);
    }

    private void init() {
        int x = 0, y = Y - 3;
        while (x + 2 < X) {
            put(x, y, "\\o/");
            put(x+1, y+1, 'O');
            put(x, y+2, "J L");
            x += 5;
            flush();
        }

        ship_x = X/2;
        ship_v = 0;
        draw_ship(false);

        gt = 0;
        flush();
    }
}
