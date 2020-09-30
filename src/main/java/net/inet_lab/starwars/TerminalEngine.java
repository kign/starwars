package net.inet_lab.starwars;

import com.googlecode.lanterna.TerminalSize;
import com.googlecode.lanterna.graphics.TextGraphics;
import com.googlecode.lanterna.input.KeyStroke;
import com.googlecode.lanterna.input.KeyType;
import com.googlecode.lanterna.terminal.DefaultTerminalFactory;
import com.googlecode.lanterna.terminal.Terminal;

import java.io.IOException;

public class TerminalEngine implements DisplayDriver, EventDriver {
    private final TextGraphics g;
    private final Terminal term;

    private final int status_lines = 1;
    private final double fps = 5;
    private final int X, Y;

    @Override
    public int getWidth() {
        return X;
    }

    @Override
    public int getHeight() {
        return Y;
    }

    @Override
    public void put(int x, int y, String text) {
        g.putString(x, y, text);
    }

    @Override
    public void msg(String text) {
        if (status_lines > 0) {
            put(0, Y, " ".repeat(X));
            put(0, Y, text);
            flush();
        }
    }

    @Override
    public void flush() {
        try {
            term.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run(GameMove gameMove) throws InterruptedException {
        gameMove.init(System.currentTimeMillis());

        while(true) {
            KeyStroke key = null;
            Key gkey = null;
            try {
                key = term.pollInput();
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (key != null) {
                KeyType tkey = key.getKeyType();
                Character tchar = key.getCharacter();
                if (tkey == KeyType.Escape)
                    gkey = Key.ESC;
                else if (tkey == KeyType.ArrowRight)
                    gkey = Key.RIGHT;
                else if (tchar != null) {
                    if (tchar == ' ')
                        gkey = Key.SPC;
                    else {
                        try {
                            gkey = Key.valueOf(tchar.toString().toUpperCase());
                        }
                        catch (IllegalArgumentException _) {
                            msg("Key <" + tchar + "> ignored");
                        }
                    }
                }
            }

            if(!gameMove.move(gkey))
                return;
            Thread.sleep((long) (1000 / fps));
        }

    }

    @Override
    public void destroy() {
        if (term != null) {
            try {
                term.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public TerminalEngine () throws IOException {
        DefaultTerminalFactory defaultTerminalFactory = new DefaultTerminalFactory();
        term = defaultTerminalFactory.createTerminal();
        term.enterPrivateMode();
        term.clearScreen();
        term.setCursorVisible(false);

        g = term.newTextGraphics();

        final TerminalSize s = term.getTerminalSize();
        X = s.getColumns();
        Y = s.getRows() - status_lines;
    }
}
