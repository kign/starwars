package net.inet_lab.starwars;

import com.googlecode.lanterna.TerminalSize;
import com.googlecode.lanterna.graphics.TextGraphics;
import com.googlecode.lanterna.input.KeyStroke;
import com.googlecode.lanterna.input.KeyType;
import com.googlecode.lanterna.terminal.DefaultTerminalFactory;
import com.googlecode.lanterna.terminal.Terminal;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.nio.file.StandardOpenOption.CREATE_NEW;

public class TerminalEngine implements DisplayDriver, EventDriver {
    private final TextGraphics g;
    private Terminal term;

    private int status_lines = 0;
    private OutputStreamWriter trail = null;
    private static final int TRAIL_VER = 1;
    private final double fps = 5;
    private final int X, Y;
    boolean write_filed = false;

    @Override
    public int getWidth() {
        return X;
    }

    @Override
    public int getHeight() {
        return Y - status_lines;
    }

    @Override
    public void put(int x, int y, String text) {
        g.putString(x, y, text);
    }

    @Override
    public void msg(String text) {
        if (status_lines > 0) {
            put(0, Y-1, " ".repeat(X));
            put(0, Y-1, text);
            flush();
        }
        trail_write("# " + text);
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
        final long seed = System.currentTimeMillis();

        trail_write("TRAIL " + TRAIL_VER + " " + X + " " + Y + " " + seed);

        gameMove.init(seed);

        int tick = 0;

        while(true) {
            tick ++;

            KeyStroke key = null;
            Key gkey = null;
            try {
                key = term.pollInput();
            } catch (IOException e) {
                msg("poll failed " + e);
            }
            if (key != null) {
                KeyType tkey = key.getKeyType();
                Character tchar = key.getCharacter();
                if (tkey == KeyType.Escape)
                    gkey = Key.ESC;
                else if (tkey == KeyType.ArrowRight)
                    gkey = Key.RIGHT;
                else if (tkey == KeyType.ArrowLeft)
                    gkey = Key.LEFT;
                else if (tchar != null) {
                    if (tchar == ' ')
                        gkey = Key.SPC;
                    else {
                        try {
                            gkey = Key.valueOf(tchar.toString().toUpperCase());
                        }
                        catch (IllegalArgumentException err) {
                            msg("Key <" + tchar + "> ignored");
                        }
                    }
                }
            }

            if (gkey != null)
                trail_write(tick + " K " + gkey);
            if(!gameMove.move(gkey)) {
                trail_write(tick + " E NORM");
                destroy();
                return;
            }
            Thread.sleep((long) (1000 / fps));
        }
    }

    private void trail_write(String text) {
        if (trail == null)
            return;

        try {
            trail.write(text + "\n");
            trail.flush();
        } catch (IOException e) {
            if (!write_filed) {
                write_filed = true;
                msg("Trail: " + e);
            }
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
            term = null;
        }

        if (trail != null) {
            try {
                trail.close();
            } catch (IOException e) {
                if (!write_filed) {
                    write_filed = true;
                    msg("Trail: " + e);
                }
            }
            trail = null;
        }
    }

    public TerminalEngine statusLine(int status_line) {
        this.status_lines = status_line;
        return this;
    }

    public TerminalEngine trailFile(String trail_file) {
        if (trail_file != null) {
            OutputStream out = null;
            for(int v = 0; out == null && v < 1000; v ++) {
                final String vfile = trail_file + ((v == 0) ? "" : ("." + v));
                final Path p = Paths.get(vfile);
                try {
                    out = Files.newOutputStream(p, CREATE_NEW);
                    trail = new OutputStreamWriter(out);
                    msg("Writing trail to " + vfile);
                } catch (FileAlreadyExistsException e) {
                    trail = null;
                } catch (IOException e) {
                    trail = null;
                    msg("Trail: " + e);
                    break;
                }
            }
        }
        return this;
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
        Y = s.getRows();
    }
}
