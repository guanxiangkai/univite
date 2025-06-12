export const login = async (params: {
  username: string;
  password: string;
}): Promise<{ code: number; data: { token: string } }> => {
  // 开发环境特殊处理（生产环境构建时此代码会被完全移除）
  if (process.env.NODE_ENV === 'development') {
    return {
      code: 200,
      data: {token: 'mock-token-123'}
    };
  }else{
    const response = await request.post<LoginResponse>('/api/login', data)
    return response.data
  }
}
