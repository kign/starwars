package net.inet_lab.starwars;

import java.util.*;

public class SWGame implements TerminalGame {
    final DisplayDriver disp;

    // Terminal data
    private final int X, Y;

    // Game options
    private final int ship_max_v = 3;
    private final String ship_img = "(****)";
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
            if (y >= Y)
                return false;

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

            disp.put(x, y, mars_img[t % mars_img.length]);
            disp.flush();

            if (rand.nextDouble() < bomb_freq)
                drop_bomb ();

            return true;
        }

        public void clear () {
            final int L = mars_img[0].length();
            disp.put(x, y, " ".repeat(L));
        }

        public void drop_bomb() {
            final int bx = x + mars_img[0].length()/2;
            if (bx >= 0 && bx < X-1)
                bombs.add(new Bomb(bx, y));
        }
    }

    public SWGame(DisplayDriver displayDriver) {
        this.disp = displayDriver;

        X = disp.getWidth();
        Y = disp.getHeight();
    }

    @Override
    public boolean move(EventDriver.Key key) {
        gt ++;

        if (key != null) {
            if (key == EventDriver.Key.ESC || key == EventDriver.Key.Q)
                return false;
            else if (ship_v < ship_max_v && key == EventDriver.Key.RIGHT) {
                ship_v++;
                disp.msg("Speed " + ship_v);
            }
            else if (ship_v > -ship_max_v && key == EventDriver.Key.LEFT) {
                ship_v--;
                disp.msg("Speed " + ship_v);
            }
            else if (key == EventDriver.Key.SPC)
                missiles.add(new Missile(ship_x, Y - ship_h, ship_v/4.0));
        }

        _move ();
        return true;
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
        disp.flush();

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
        disp.put(ship_x -  L/2, Y - ship_h, erase?" ".repeat(L):ship_img);
    }

    @Override
    public void init(long seed) {
        if (seed != 0)
            rand.setSeed(seed);

        int x = 0, y = Y - 3;
        while (x + 2 < X) {
            disp.put(x, y, "\\o/");
            disp.put(x+1, y+1, "O");
            disp.put(x, y+2, "J L");
            x += 5;
            disp.flush();
        }

        ship_x = X/2;
        ship_v = 0;
        draw_ship(false);

        gt = 0;
        disp.flush();
    }
}
