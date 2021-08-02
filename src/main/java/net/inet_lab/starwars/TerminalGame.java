package net.inet_lab.starwars;

public interface TerminalGame {
    boolean move(EventDriver.Key key);
    void init(long seed);
}
