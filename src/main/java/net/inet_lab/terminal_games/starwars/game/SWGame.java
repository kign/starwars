package net.inet_lab.terminal_games.starwars.game;

import net.inet_lab.terminal_games.common.DisplayDriver;
import net.inet_lab.terminal_games.common.EventDriver;
import net.inet_lab.terminal_games.common.TerminalGame;
import net.inet_lab.terminal_games.common.Utils;

import java.util.*;

public class SWGame implements TerminalGame {
    private DisplayDriver disp;

    // Terminal data
    private int X, Y;

    // Game options
    private final int ship_max_v = 3;
    private final String ship_img = "(****)";
    private final String[] mars_img = {"/***\\", "\\***/"};
    private final int mars_strip = 5;
    private final int mars_num = 5;
    private final int mars_total = 120;
    private final int ship_h = 4;
    private final double bomb_freq = 0.02;
    private final int humans_width = 3;
    private final int humans_period = 5;

    // random generator
    private final Random rand = new Random ();

    // runtime data; all vars must be reset in `init`
    private int timer;
    private int ship_x;
    private int ship_v;
    final private Mars[] mars_a = new Mars[mars_num];
    final private LinkedList<Bomb> bombs = new LinkedList<>();
    final private LinkedList<Missile> missiles = new LinkedList<>();
    private boolean[] bombs_ground;
    int humans_cnt;
    int mars_reserve;

    public SWGame() {
        // Using generic JavaScript bridge necessitates no-arg x-tor
    }

    private class Missile {
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
            final int ix = (int)x;
            if (ix < 0 || ix >= X)
                return false;
            disp.put(ix, y, "^");
            return true;
        }

        public int get_pos () {
            return (int)x * Y + y;
        }

        public void clear () {
            disp.put((int) x, y, " ");
        }
    }

    private class Bomb {
        int y;
        final int x;
        public Bomb(final int x, final int y) {
            this.x = x;
            this.y = y;
        }

        public boolean move () {
            clear ();
            y ++;
            if (y >= Y) {
                if (!bombs_ground[x]) {
                    int h = 0;
                    bombs_ground[x] = true;
                    for (int vx = 0; vx + humans_width <= X; vx += humans_period) {
                        int remains = 0;
                        for (int wx = 0; wx < humans_width; wx ++)
                            if (!bombs_ground[vx + wx])
                                remains ++;
                        if (remains > 0)
                            h ++;
                    }
                    if (h != humans_cnt && h != humans_cnt-1)
                        log("Something's off, humans count changed from " + humans_cnt + " to " + h);
                    if (h != humans_cnt) {
                        humans_cnt = h;
                        msg("One less human, sorry");
                    }
                }
                return false;
            }

            disp.put(x, y, "o");
            return true;
        }

        public int get_pos () {
            return x * Y + y;
        }

        public void clear () {
            disp.put(x, y, " ");
        }
    }

    private class Mars {
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

            put_smart(x, y, mars_img[t % mars_img.length]);
            disp.flush();

            if (rand.nextDouble() < bomb_freq)
                drop_bomb ();

            return true;
        }

        public void clear () {
            final int L = mars_img[0].length();
            put_smart(x, y, Utils.repeat(" ", L));
        }

        public void drop_bomb() {
            final int bx = x + mars_img[0].length()/2;
            if (bx >= 0 && bx < X-1)
                bombs.add(new Bomb(bx, y));
        }
    }

    @Override
    public TerminalGame.Status move(EventDriver.Key key) {
        timer++;

        if (key != null) {
            if (ship_v < ship_max_v && key == EventDriver.Key.RIGHT) {
                ship_v++;
                msg("Speed " + ship_v);
            }
            else if (ship_v > -ship_max_v && key == EventDriver.Key.LEFT) {
                ship_v--;
                msg("Speed " + ship_v);
            }
            else if (key == EventDriver.Key.SPC)
                missiles.add(new Missile(ship_x, Y - ship_h, ship_v/4.0));
        }

        _move ();
        if (humans_cnt == 0 /* || timer > 30 */)
            return TerminalGame.Status.LOSE;
        else if (mars_reserve == 0 && mars_active() == 0)
            return TerminalGame.Status.WIN;
        else
            return TerminalGame.Status.CONT;
    }

    private void _move () {
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

        for(int ii = 0; ii < mars_a.length; ii ++) {
            if (mars_a[ii] == null) {
                if (timer > 20 && mars_reserve > 0) {
                    mars_a[ii] = new Mars();
                    mars_reserve --;
                }
            }
            else if (!mars_a[ii].move()) {
                mars_a[ii] = null;
                mars_reserve ++;
            }
        }

        Utils.removeIf(bombs, bomb -> !bomb.move());
        missile_x_bomb();
        Utils.removeIf(missiles, missile -> !missile.move());
        missile_x_bomb();

        missile_x_mars ();
        disp.flush();
    }

    private void missile_x_mars () {
        Utils.removeIf(missiles, missile -> {
            if (missile.y >= mars_strip)
                return false;

            for (int ii = 0; ii < mars_a.length; ii++)
                if (mars_a[ii] != null &&
                        mars_a[ii].y == missile.y &&
                        (int)missile.x >= mars_a[ii].x &&
                        (int)missile.x < mars_a[ii].x + mars_img[0].length()) {

                    mars_a[ii].clear();
                    mars_a[ii] = null;
                    msg("Yey, one less ship!");
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

        Utils.removeIf(bombs, bomb -> {
            boolean rem = c_missiles.contains(bomb.get_pos());
            if (rem)
                bomb.clear();
            return rem;
        });
        Utils.removeIf(missiles, missile -> {
            boolean rem = c_missiles.contains(missile.get_pos());
            if (rem)
                missile.clear ();
            return rem;
        });
    }

    private void draw_ship(final boolean erase) {
        final int L = ship_img.length();
        disp.put(ship_x -  L/2, Y - ship_h, erase?Utils.repeat(" ",L):ship_img);
    }

    private void put_smart(int x, int y, String text) {
        final int L = text.length();
        if (x < 0)
            disp.put(0, y, text.substring(-x));
        else if (x + L > X)
            disp.put(x, y, text.substring(0, X - x));
        else
            disp.put(x, y, text);
    }

    @Override
    public void init(DisplayDriver displayDriver, long seed) {
        this.disp = displayDriver;

        X = disp.getWidth();
        Y = disp.getHeight();

        log("SWGame: X = " + X + ", Y = " + Y);

        bombs_ground = new boolean[X];

        if (seed != 0)
            rand.setSeed(seed);

        int x = 0, y = Y - 3;
        humans_cnt = 0;
        while (x + humans_width <= X) {
            disp.put(x, y, "\\o/");
            disp.put(x+1, y+1, "O");
            disp.put(x, y+2, "J L");
            x += humans_period;
            humans_cnt ++;
            disp.flush();
        }

        ship_x = X/2;
        ship_v = 0;
        draw_ship(false);

        timer = 0;

        for (int ii = 0; ii < mars_num; ii ++)
            mars_a[ii] = null;
        mars_reserve = mars_total;
        bombs.clear();
        missiles.clear();

        disp.flush();

        msg("Starting the game!");
    }

    private void log(String message) {
        this.disp.log(message);
    }

    private int mars_active () {
        int n = 0;
        for (int ii = 0; ii < mars_num; ii++)
            if (mars_a[ii] != null)
                n ++;

        return n;
    }

    private void msg(String message) {
        final String statusLine = "| Ships: " + (mars_active() + mars_reserve) + "; Humans: " + humans_cnt;
        final int L = X - statusLine.length();

        if (message.length() > L)
            message = message.substring(0, L - 3) + "...";
        disp.msg(message + Utils.repeat(" ", L - message.length()) + statusLine);
    }
}
