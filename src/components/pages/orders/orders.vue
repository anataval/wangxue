<template>
    <div id="container">

    </div>
</template>

<script>
export default {
    mounted() {
        var map = new BMap.Map("container");
        //地图实例
        var point = new BMap.Point(116.404, 39.915);
        //点坐标
        map.centerAndZoom(point, 15);
        //初始化，设置中心点坐标和地图级别
        map.addControl(new BMap.NavigationControl())

        var driving = new BMap.DrivingRoute(map, {
            renderOptions: {
                map : map,
                autoViewport : true
            }
        });
        driving.search("顺义", "武汉")
    }
}
</script>

<style>

</style>
