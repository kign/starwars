package net.inet_lab.starwars;

import com.googlecode.lanterna.SGR;
import com.googlecode.lanterna.TextColor;
import com.googlecode.lanterna.graphics.TextGraphics;
import com.googlecode.lanterna.input.KeyStroke;
import com.googlecode.lanterna.input.KeyType;
import com.googlecode.lanterna.terminal.DefaultTerminalFactory;
import com.googlecode.lanterna.terminal.Terminal;

import java.io.IOException;

public class SWApp {
    public static void main(String[] args) throws InterruptedException {
        DefaultTerminalFactory defaultTerminalFactory = new DefaultTerminalFactory();
        Terminal terminal = null;
        try {
            terminal = defaultTerminalFactory.createTerminal();
            terminal.enterPrivateMode();
            terminal.clearScreen();
            terminal.setCursorVisible(false);

            final TextGraphics textGraphics = terminal.newTextGraphics();

            final SWGame game = new SWGame(terminal, textGraphics);
            game.start();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (terminal != null) {
                try {
                    /*
                    The close() call here will exit private mode
                     */
                    terminal.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }
}
