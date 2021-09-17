public class AppwritePlugin extends BasePlugin {

    public HelloWorldPlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    @Slf4j
    @Extension
    public static class HelloWorldPluginExecutor implements PluginExecutor<Object> {
    }
}