package net.inet_lab.terminal_games.common;

public interface TerminalGame {
    Status move(EventDriver.Key key);
    void init(DisplayDriver displayDriver, long seed);

    enum Status {
        CONT, WIN, LOSE;
    }
}
