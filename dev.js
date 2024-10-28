require("@babel/register")({
    extensions: [".js", ".ts"],
});
require("./backend/src/server.ts");
