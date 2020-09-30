package net.inet_lab.starwars;

public interface EventDriver {
    enum Key {
        Q, ESC, LEFT, RIGHT, SPC;
    }
    void run(GameMove gameMove) throws InterruptedException;
}
