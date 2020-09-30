package net.inet_lab.starwars;

public interface GameMove {
    boolean move(EventDriver.Key key);
    void init(long seed);
}
