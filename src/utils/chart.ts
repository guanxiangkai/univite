import uCharts from 'ucharts';

// 图表类型定义
type ChartType = 'line' | 'column' | 'area' | 'pie' | 'ring' | 'rose' | 'radar' | 'gauge' | 'candle';

// 图表配置类型
interface ChartConfig {
  type: ChartType;
  canvasId: string;
  context: any;
  width: number;
  height: number;
  categories?: string[];
  series: any[];
  title?: {
    name: string;
    fontSize?: number;
    color?: string;
  };
  subtitle?: {
    name: string;
    fontSize?: number;
    color?: string;
  };
  legend?: {
    show?: boolean;
    position?: 'top' | 'right' | 'bottom' | 'left';
  };
  xAxis?: {
    fontColor?: string;
    fontSize?: number;
    rotateLabel?: boolean;
  };
  yAxis?: {
    data?: Array<{
      min?: number;
      max?: number;
      title?: string;
      fontColor?: string;
      titleFontColor?: string;
      format?: (val: number) => string;
    }>;
    showTitle?: boolean;
    disabled?: boolean;
    disableGrid?: boolean;
    gridType?: 'solid' | 'dash';
    splitNumber?: number;
    gridColor?: string;
    fontColor?: string;
    fontSize?: number;
  };
  extra?: Record<string, any>;
  background?: string;
  pixelRatio?: number;
  padding?: number[];
  enableScroll?: boolean;
  enableMarkLine?: boolean;
  dataLabel?: boolean;
  dataPointShape?: boolean;
  tapLegend?: boolean;
}

/**
 * 图表工具类
 */
export class ChartUtils {
  private static chartInstances: Map<string, any> = new Map();

  /**
   * 创建图表
   * @param config 图表配置
   * @returns 图表实例
   */
  static createChart(config: ChartConfig) {
    try {
      // 设置默认值
      const defaultConfig = {
        padding: [15, 15, 15, 15],
        background: '#FFFFFF',
        pixelRatio: uni.getSystemInfoSync().pixelRatio,
        enableScroll: false,
        enableMarkLine: false,
        dataLabel: true,
        dataPointShape: true,
        tapLegend: true,
        ...config,
      };

      // 创建图表实例
      const chart = new uCharts(defaultConfig);
      this.chartInstances.set(config.canvasId, chart);
      return chart;
    } catch (error) {
      console.error('创建图表失败:', error);
      return null;
    }
  }

  /**
   * 更新图表数据
   * @param canvasId 画布ID
   * @param series 新的系列数据
   * @param categories 新的类别数据（可选）
   * @param title 新的标题（可选）
   * @param subtitle 新的副标题（可选）
   */
  static updateChart(canvasId: string, series: any[], categories?: string[], title?: string, subtitle?: string) {
    try {
      const chart = this.chartInstances.get(canvasId);
      if (!chart) {
        console.warn(`图表实例 ${canvasId} 不存在`);
        return;
      }

      // 更新数据
      chart.updateData({
        series,
        categories,
        title: title ? {name: title} : undefined,
        subtitle: subtitle ? {name: subtitle} : undefined,
      });
    } catch (error) {
      console.error('更新图表失败:', error);
    }
  }

  /**
   * 销毁图表实例
   * @param canvasId 画布ID
   */
  static destroyChart(canvasId: string) {
    try {
      if (this.chartInstances.has(canvasId)) {
        this.chartInstances.delete(canvasId);
      }
    } catch (error) {
      console.error('销毁图表失败:', error);
    }
  }

  /**
   * 创建折线图
   * @param canvasId 画布ID
   * @param context 画布上下文
   * @param width 宽度
   * @param height 高度
   * @param categories 类别数据
   * @param series 系列数据
   * @param options 其他配置选项
   * @returns 图表实例
   */
  static createLineChart(canvasId: string, context: any, width: number, height: number, categories: string[], series: any[], options: Partial<ChartConfig> = {}) {
    return this.createChart({
      type: 'line',
      canvasId,
      context,
      width,
      height,
      categories,
      series,
      enableMarkLine: true,
      dataPointShape: true,
      xAxis: {
        fontColor: '#666666',
        fontSize: 12,
        rotateLabel: false,
      },
      yAxis: {
        gridType: 'dash',
        gridColor: '#CCCCCC',
        fontColor: '#666666',
        fontSize: 12,
        splitNumber: 5,
      },
      extra: {
        line: {
          type: 'straight',
          width: 2,
        },
      },
      ...options,
    });
  }

  /**
   * 创建柱状图
   * @param canvasId 画布ID
   * @param context 画布上下文
   * @param width 宽度
   * @param height 高度
   * @param categories 类别数据
   * @param series 系列数据
   * @param options 其他配置选项
   * @returns 图表实例
   */
  static createColumnChart(canvasId: string, context: any, width: number, height: number, categories: string[], series: any[], options: Partial<ChartConfig> = {}) {
    return this.createChart({
      type: 'column',
      canvasId,
      context,
      width,
      height,
      categories,
      series,
      xAxis: {
        fontColor: '#666666',
        fontSize: 12,
        rotateLabel: false,
      },
      yAxis: {
        gridType: 'dash',
        gridColor: '#CCCCCC',
        fontColor: '#666666',
        fontSize: 12,
        splitNumber: 5,
      },
      extra: {
        column: {
          width: 20,
          radius: 3,
        },
      },
      ...options,
    });
  }

  /**
   * 创建饼图
   * @param canvasId 画布ID
   * @param context 画布上下文
   * @param width 宽度
   * @param height 高度
   * @param series 系列数据
   * @param options 其他配置选项
   * @returns 图表实例
   */
  static createPieChart(canvasId: string, context: any, width: number, height: number, series: any[], options: Partial<ChartConfig> = {}) {
    return this.createChart({
      type: 'pie',
      canvasId,
      context,
      width,
      height,
      series,
      dataLabel: true,
      extra: {
        pie: {
          labelWidth: 15,
          offsetAngle: 0,
          hoverAnimation: true,
        },
      },
      ...options,
    });
  }

  /**
   * 创建环形图
   * @param canvasId 画布ID
   * @param context 画布上下文
   * @param width 宽度
   * @param height 高度
   * @param series 系列数据
   * @param options 其他配置选项
   * @returns 图表实例
   */
  static createRingChart(canvasId: string, context: any, width: number, height: number, series: any[], options: Partial<ChartConfig> = {}) {
    return this.createChart({
      type: 'ring',
      canvasId,
      context,
      width,
      height,
      series,
      dataLabel: true,
      extra: {
        ring: {
          ringWidth: 30,
          labelWidth: 15,
          hoverAnimation: true,
        },
      },
      ...options,
    });
  }

  /**
   * 创建雷达图
   * @param canvasId 画布ID
   * @param context 画布上下文
   * @param width 宽度
   * @param height 高度
   * @param categories 类别数据
   * @param series 系列数据
   * @param options 其他配置选项
   * @returns 图表实例
   */
  static createRadarChart(canvasId: string, context: any, width: number, height: number, categories: string[], series: any[], options: Partial<ChartConfig> = {}) {
    return this.createChart({
      type: 'radar',
      canvasId,
      context,
      width,
      height,
      categories,
      series,
      dataPointShape: true,
      extra: {
        radar: {
          gridType: 'circle',
          gridColor: '#CCCCCC',
          labelColor: '#666666',
          max: 100,
        },
      },
      ...options,
    });
  }
}
