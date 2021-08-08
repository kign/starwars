package net.inet_lab.terminal_games.common;

public interface DisplayDriver {
    // screen size in characters
    int getWidth();
    int getHeight();

    // Show text on screen
    void put(int x, int y, String text);

    // Print user-visible message
    void msg(String text);

    // Print debug message
    void log(String text);

    // flush updates
    void flush();

    // cleanup
    void destroy();
}
