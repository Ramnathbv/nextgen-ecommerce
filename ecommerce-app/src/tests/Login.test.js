import { renderHook } from '@testing-library/react-hooks';
import useFetch from './useFetch';
import * as api from '../services/api';

jest.mock('../services/api');

describe('useFetch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return data', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    api.fetchData.mockResolvedValueOnce(mockData);

    const { result, waitForNextUpdate } = renderHook(() => useFetch('/test-url'));
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle fetch error', async () => {
    api.fetchData.mockRejectedValueOnce('Fetch error');

    const { result, waitForNextUpdate } = renderHook(() => useFetch('/error-url'));
    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Fetch error');
    expect(result.current.isLoading).toBe(false);
  });
});