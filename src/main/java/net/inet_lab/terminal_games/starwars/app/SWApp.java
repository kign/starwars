package net.inet_lab.terminal_games.starwars.app;

import net.inet_lab.terminal_games.app.TerminalEngine;
import net.inet_lab.terminal_games.starwars.game.SWGame;

import java.io.IOException;

public class SWApp {
    public static void main(String[] args) throws InterruptedException, IOException {
        TerminalEngine terminalEngine = new TerminalEngine().statusLine(1).saveTrailFile("sw.trail");
        if (args.length > 0)
            terminalEngine.playTrailFile(args[0]);
        SWGame game = new SWGame(terminalEngine);
        terminalEngine.run(game);
        terminalEngine.destroy();
    }
}
