package net.inet_lab.starwars;

public interface DisplayDriver {
    int getWidth();
    int getHeight();
    void put(int x, int y, String text);
    void msg(String text);
    void flush();
    void destroy();
}
