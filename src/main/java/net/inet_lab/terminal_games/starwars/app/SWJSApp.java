package net.inet_lab.terminal_games.starwars.app;

import net.inet_lab.terminal_games.jsbridge.JSApp;
import net.inet_lab.terminal_games.starwars.game.SWGame;

public class SWJSApp {
    static {
        JSApp.game = new SWGame();
    }
    public static void main(String[] args) {
        JSApp.dispatch(args);
    }
}
