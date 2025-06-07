/**
 * 模拟API服务
 */

// 模拟列表项接口
export interface MockListItem {
  id: number;
  title: string;
  content: string;
  time: string;
  tags?: string[];
  image?: string;
}

// 模拟分页数据接口
export interface PageResult<T> {
  list: T[];
  total: number;
  pageNo: number;
  pageSize: number;
  hasNext: boolean;
}

// 模拟API错误
export class ApiError extends Error {
  code: number;

  constructor(message: string, code: number = 500) {
    super(message);
    this.code = code;
    this.name = 'ApiError';
  }
}

// 模拟延迟
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 模拟列表数据
export async function getMockListData<T = MockListItem>({
                                                          pageNo = 1,
                                                          pageSize = 10,
                                                          delayMs = 1000,
                                                          total = 100,
                                                          mockData = mockListData
                                                        }: {
  pageNo?: number;
  pageSize?: number;
  delayMs?: number;
  total?: number;
  mockData?: (pageNo: number, pageSize: number) => T[];
}): Promise<PageResult<T>> {
  // 模拟网络延迟
  await delay(delayMs);

  // 随机失败率5%
  if (Math.random() < 0.05) {
    throw new ApiError('网络请求失败，请重试', 500);
  }

  // 生成数据
  const list = mockData(pageNo, pageSize);

  // 如果当前页码超过了总页数，返回空数组
  const maxPage = Math.ceil(total / pageSize);
  if (pageNo > maxPage) {
    return {
      list: [],
      total,
      pageNo,
      pageSize,
      hasNext: false
    };
  }

  // 计算是否有下一页
  const hasNext = pageNo * pageSize < total;

  // 返回分页数据
  return {
    list,
    total,
    pageNo,
    pageSize,
    hasNext
  };
}

// 默认的模拟数据生成函数
function mockListData(pageNo: number, pageSize: number): MockListItem[] {
  const result: MockListItem[] = [];
  const startIndex = (pageNo - 1) * pageSize;

  for (let i = 0; i < pageSize; i++) {
    const id = startIndex + i + 1;
    // 如果id超过了总数，就不再生成
    if (id > 100) break;

    const tags = ['标签1', '标签2', '标签3', '标签4', '标签5'];
    // 随机选择1-3个标签
    const randomTags = tags
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);

    result.push({
      id,
      title: `标题 ${id}`,
      content: `这是第${pageNo}页的第${i + 1}条数据，总序号#${id}，这是一条模拟的内容数据。`,
      time: new Date().toLocaleString(),
      tags: randomTags,
      image: id % 3 === 0 ? `https://picsum.photos/300/200?random=${id}` : undefined
    });
  }

  return result;
}
