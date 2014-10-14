var GameOver = cc.Layer.extend({
    onEnter:function (){
        //call super class's super function
        this._super();
        cc.log("GameOver1");
        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, (winsize.height / 2)-100);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.GameOver_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);

        //5.create a menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.playagain_n_png), // normal state image
            new cc.Sprite(res.playagain_s_png), //select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(centerpos);
        this.addChild(menu);
    },
    onPlay : function(){
        cc.log("==onplay clicked again");
        cc.director.runScene(new MenuScene());
    }
});