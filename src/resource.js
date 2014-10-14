var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    Player_png : "res/player.png",
    start_n_png : "res/start_n.png",
    start_s_png : "res/start_s.png",
    background_1_png : "res/testmap_01.png",
    Enemy_01_png : "res/enemy_01.png",
    Enemy_02_png : "res/enemy_02.png",
    coin_png : "res/coin.png",
    map_01: "res/map01.tmx",
    tile_1: "res/1.png",
    tile_3: "res/3.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}