package net.inet_lab.terminal_games.common;

public interface TerminalGame {
    boolean move(EventDriver.Key key);
    void init(DisplayDriver displayDriver, long seed);
}
