import apiHttp from '../http';

// 通用API接口
export const CommonApi = {
  /**
   * 获取系统配置
   */
  getConfig() {
    return apiHttp.get<{
      appName: string;
      appLogo: string;
      appVersion: string;
      aboutUs: string;
      privacyPolicy: string;
      userAgreement: string;
    }>('/api/common/config');
  },

  /**
   * 获取版本信息
   */
  getVersion() {
    return apiHttp.get<{
      version: string;
      isForceUpdate: boolean;
      updateContent: string;
      downloadUrl: string;
    }>('/api/common/version');
  },

  /**
   * 获取地区列表
   */
  getRegions() {
    return apiHttp.get<Array<{
      code: string;
      name: string;
      children?: Array<{
        code: string;
        name: string;
        children?: Array<{
          code: string;
          name: string;
        }>;
      }>;
    }>>('/api/common/regions');
  },

  /**
   * 上传文件
   * @param filePath 文件路径
   * @param formData 额外表单数据
   */
  uploadFile(filePath: string, formData: Record<string, any> = {}) {
    // 使用环境变量中配置的上传地址
    const uploadUrl = import.meta.env.VITE_UPLOAD_BASEURL
      ? `${import.meta.env.VITE_UPLOAD_BASEURL}/api/common/upload`
      : '/api/common/upload';

    return apiHttp.uploadFile(
      uploadUrl,
      filePath,
      'file',
      formData,
      {showLoading: true, loadingText: '上传中...'}
    );
  },

  /**
   * 发送验证码
   * @param mobile 手机号
   */
  sendSmsCode(mobile: string) {
    return apiHttp.post('/api/common/send-sms-code', {mobile});
  },
};
