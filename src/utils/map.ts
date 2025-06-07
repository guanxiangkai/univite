import amapFile from 'amap-wx';

/**
 * 地图工具类
 */
export class MapUtils {
  private static amapInstance: any = null;
  private static key: string = ''; // 高德地图 key，需要在初始化时设置

  /**
   * 初始化地图
   * @param key 高德地图 key
   */
  static init(key: string) {
    this.key = key;
    this.amapInstance = new amapFile.AMapWX({key});
  }

  /**
   * 获取当前位置
   * @returns Promise 返回位置信息
   */
  static getLocation(): Promise<{ longitude: number; latitude: number; accuracy: number }> {
    return new Promise((resolve, reject) => {
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          resolve({
            longitude: res.longitude,
            latitude: res.latitude,
            accuracy: res.accuracy,
          });
        },
        fail: (err) => {
          console.error('获取位置失败:', err);
          reject(err);
        },
      });
    });
  }

  /**
   * 获取地址描述
   * @param longitude 经度
   * @param latitude 纬度
   * @returns Promise 返回地址描述
   */
  static getRegeo(longitude: number, latitude: number): Promise<any> {
    const amap = this.getInstance();
    if (!amap) return Promise.reject('地图未初始化');

    return new Promise((resolve, reject) => {
      amap.getRegeo({
        location: `${longitude},${latitude}`,
        success: (data: any) => {
          resolve(data);
        },
        fail: (err: any) => {
          console.error('获取地址描述失败:', err);
          reject(err);
        },
      });
    });
  }

  /**
   * 关键词搜索地点
   * @param keyword 关键词
   * @param location 位置（经纬度，格式：'longitude,latitude'），可选
   * @returns Promise 返回搜索结果
   */
  static poiSearch(keyword: string, location?: string): Promise<any> {
    const amap = this.getInstance();
    if (!amap) return Promise.reject('地图未初始化');

    return new Promise((resolve, reject) => {
      amap.getPoiAround({
        keywords: keyword,
        location,
        success: (data: any) => {
          resolve(data);
        },
        fail: (err: any) => {
          console.error('关键词搜索地点失败:', err);
          reject(err);
        },
      });
    });
  }

  /**
   * 计算路线规划
   * @param origin 起点（经纬度，格式：'longitude,latitude'）
   * @param destination 终点（经纬度，格式：'longitude,latitude'）
   * @param mode 出行方式（walking-步行，transit-公交，driving-驾车，默认为 walking）
   * @returns Promise 返回路线规划结果
   */
  static calculateRoute(
    origin: string,
    destination: string,
    mode: 'walking' | 'transit' | 'driving' = 'walking'
  ): Promise<any> {
    const amap = this.getInstance();
    if (!amap) return Promise.reject('地图未初始化');

    const methodMap = {
      walking: 'getWalkingRoute',
      transit: 'getTransitRoute',
      driving: 'getDrivingRoute',
    };

    const method = methodMap[mode];

    return new Promise((resolve, reject) => {
      amap[method]({
        origin,
        destination,
        success: (data: any) => {
          resolve(data);
        },
        fail: (err: any) => {
          console.error(`计算${mode}路线失败:`, err);
          reject(err);
        },
      });
    });
  }

  /**
   * 在地图上显示标记点
   * @param markers 标记点信息
   * @param settings 地图设置
   */
  static showMarkers(markers: any[], settings: any = {}) {
    const mapContext = uni.createMapContext('map');
    if (!mapContext) {
      console.error('地图上下文获取失败');
      return;
    }

    mapContext.addMarkers({
      markers,
      clear: true,
      success: () => {
        console.log('添加标记点成功');
      },
      fail: (err: any) => {
        console.error('添加标记点失败:', err);
      },
    });

    // 设置地图显示范围
    if (settings.latitude && settings.longitude) {
      mapContext.moveToLocation({
        latitude: settings.latitude,
        longitude: settings.longitude,
        success: () => {
          console.log('移动地图位置成功');
        },
        fail: (err: any) => {
          console.error('移动地图位置失败:', err);
        },
      });
    }
  }

  /**
   * 天气查询
   * @param city 城市名称
   * @returns Promise 返回天气信息
   */
  static getWeather(city: string): Promise<any> {
    const amap = this.getInstance();
    if (!amap) return Promise.reject('地图未初始化');

    return new Promise((resolve, reject) => {
      amap.getWeather({
        city,
        success: (data: any) => {
          resolve(data);
        },
        fail: (err: any) => {
          console.error('获取天气信息失败:', err);
          reject(err);
        },
      });
    });
  }

  /**
   * 获取地图实例
   * @returns 地图实例
   */
  private static getInstance() {
    if (!this.amapInstance) {
      console.warn('地图未初始化，请先调用 MapUtils.init(key) 方法');
      return null;
    }
    return this.amapInstance;
  }
}
