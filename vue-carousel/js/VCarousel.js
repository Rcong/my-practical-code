var VCarousel = Vue.extend({
    template:
    '<div class="carousel">'+
        '<div class="img-list">'+
            '<a v-for="item in imgList" class="img-item" v-bind:class="classSetting" data-index={{$index}} :data-url="item.url" @click:="switchItem($index)">'+
                '<img :src="item.img">'+
                '<div class="img-modal">'+
                '</div>'+
            '</a>'+
        '</div>'+
        '<ul class="switch-list">'+
            '<li v-for="item in imgList" class="switch-item"  data-index={{$index}}></li>'+
        '</ul>'+
    '</div>',
    ready: function() {

    },
    data: function () {
        return {
            classSetting: {
                'main-img-item': false,
                'prev-img-item': false,
                'next-img-item': false,
                'left-img-item': false,
                'right-img-item': false
            },
            isActive: false
        }
    },
    props: ['imgList'],
    method: {
        switchItem: function(index){
            console.log(index);
            // index = parseInt(index);
            // this.clearStyle();
            // this.mainImgItem = $('.img-item[data-index=' + index + ']');
            // this.mainSwitchItem = $('.switch-item[data-index=' + index + ']');
            //
            // if (index === 0) {
            //     this.prevImgItem = $('.img-item[data-index=' + (this.listSize - 1) + ']');
            //     this.leftImgItem = $('.img-item[data-index=' + (this.listSize - 2) + ']');
            // } else if (index === 1) {
            //     this.prevImgItem = $('.img-item[data-index=' + (index - 1) + ']');
            //     this.leftImgItem = $('.img-item[data-index=' + (this.listSize - 1) + ']');
            // } else if (index > 1) {
            //     this.prevImgItem = $('.img-item[data-index=' + (index - 1) + ']');
            //     this.leftImgItem = $('.img-item[data-index=' + (index - 2) + ']');
            // }
            //
            // if (index === (this.listSize - 1)) {
            //     this.nextImgItem = $('.img-item[data-index=' + 0 + ']');
            //     this.rightImgItem = $('.img-item[data-index=' + 1 + ']');
            // } else if (index === (this.listSize - 2)) {
            //     this.nextImgItem = $('.img-item[data-index=' + (this.listSize - 1) + ']');
            //     this.rightImgItem = $('.img-item[data-index=' + 0 + ']');
            // } else if (index < (this.listSize - 2)) {
            //     this.nextImgItem = $('.img-item[data-index=' + (index + 1) + ']');
            //     this.rightImgItem = $('.img-item[data-index=' + (index + 2) + ']');
            // }
            // this.addStyle();
        }
    }
})

Vue.component('v-carousel', VCarousel);
