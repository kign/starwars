package net.inet_lab.starwars;

import java.io.IOException;

public class SWApp {
    public static void main(String[] args) throws InterruptedException, IOException {
        TerminalEngine terminalEngine = new TerminalEngine().statusLine(1).trailFile("sw.trail");
        SWGame game = new SWGame(terminalEngine);
        terminalEngine.run(game);
        terminalEngine.destroy();
    }
}
