package net.inet_lab.terminal_games.common;

public interface EventDriver {
    enum Key {
        Q, P, ESC, LEFT, RIGHT, SPC;
    }
    void run(DisplayDriver.TerminalGame gameMove) throws InterruptedException;
}
