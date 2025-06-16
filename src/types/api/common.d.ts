/**
 * 字典项接口
 */
export interface DictItem {
  // 字典值
  value: string | number;
  // 字典标签
  label: string;
  // 字典排序
  sort?: number;
  // 字典状态
  status?: 'enabled' | 'disabled';
  // 备注
  remark?: string;
  // 子项目
  children?: DictItem[];
}

/**
 * 系统配置接口
 */
export interface SystemConfig {
  // 应用名称
  appName: string;
  // 应用版本
  appVersion: string;
  // 主题配置
  theme: {
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
    [key: string]: string;
  };
  // 上传文件配置
  upload: {
    maxSize: number;
    allowTypes: string[];
    baseUrl: string;
  };

  // 其他配置项
  [key: string]: any;
}
