package net.inet_lab.terminal_games.common;

public interface DisplayDriver {
    int getWidth();
    int getHeight();
    void put(int x, int y, String text);
    void msg(String text);
    void flush();
    void destroy();

    interface TerminalGame {
        boolean move(EventDriver.Key key);
        void init(long seed);
    }
}
