package net.inet_lab.terminal_games.jsbridge;

import net.inet_lab.terminal_games.common.DisplayDriver;
import net.inet_lab.terminal_games.common.EventDriver;
import net.inet_lab.terminal_games.common.TerminalGame;
import org.teavm.jso.JSBody;

public class JSApp {
    public static TerminalGame game;

    @JSBody(params = {"message"}, script = "console.log(message)")
    public static native void log(String message);

    @JSBody(params = {"message"}, script = "starwars_msg(message)")
    public static native void msg(String message);

    @JSBody(params = {"return_value"}, script = "saveReturnValue(return_value)")
    public static native void saveReturnValue(String return_value);

    @JSBody(params = {}, script = "return Canvas.getWidth()")
    public static native int getWidth();

    @JSBody(params = {}, script = "return Canvas.getHeight()")
    public static native int getHeight();

    @JSBody(params = {"x", "y", "text"}, script = "Canvas.put(x, y, text)")
    public static native int put(int x, int y, String text);

    public static void dispatch(String[] args) {
        String returnValue = null;

        switch (args[0]) {
            case "init" :
                init ();
                break;
            case "move" :
                returnValue = move (args[1]).toString();
                break;
            default:
                log("dispatch(" + args[0] + ") : not implemented");
        }
        saveReturnValue(returnValue);
    }

    private static void init() {
//        log("SWJSApp::int()");
        final JSCanvas jsCanvas = new JSCanvas();

        game.init(jsCanvas, 0);
    }

    private static TerminalGame.Status move(String key) {
//        if (key.length() > 0)
//            log("SWJSApp::move('" + key + "')");
        EventDriver.Key ekey;

        switch (key) {
            case "" :
                ekey = null;
                break;
            case "ArrowRight" :
                ekey = EventDriver.Key.RIGHT;
                break;
            case "ArrowLeft" :
                ekey = EventDriver.Key.LEFT;
                break;
            case "Space" :
                ekey = EventDriver.Key.SPC;
                break;
            default :
                log("Key " + key + " isn't handled");
                return TerminalGame.Status.CONT;
        }

        return game.move(ekey);
    }

    static class JSCanvas implements DisplayDriver {
        @Override
        public int getWidth() {
            return JSApp.getWidth();
        }

        @Override
        public int getHeight() {
            return JSApp.getHeight();
        }

        @Override
        public void put(int x, int y, String text) {
            JSApp.put(x, y, text);
        }

        @Override
        public void msg(String text) {
            JSApp.log("[MSG] " + text);
            JSApp.msg(text);
        }

        @Override
        public void log(String text) {
            JSApp.log(text);
        }

        @Override
        public void flush() {
        }
    }
}
