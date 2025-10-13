import { CreateTable } from '../create-table.use-case';

describe('CreateTable Use Case', () => {
  let createTable: CreateTable;

  beforeEach(() => {
    createTable = new CreateTable();
  });

  test('should create multiplication table with default limit', () => {
    const base = 5;
    const result = createTable.execute({ base });

    expect(result).toContain('5 x 1 = 5');
    expect(result).toContain('5 x 10 = 50');

    const lines = result.trim().split('\n');
    expect(lines).toHaveLength(10);
  });

  test('should create multiplication table with custom limit', () => {
    const base = 3;
    const limit = 15;
    const result = createTable.execute({ base, limit });

    //console.log(result);
    expect(result).toContain('3 x 1 = 3');
    expect(result).toContain('3 x 15 = 45');

    const lines = result.trim().split('\n');
    expect(lines).toHaveLength(15);
  });

  test('should format output correctly', () => {
    const base = 2;
    const limit = 3;
    const result = createTable.execute({ base, limit });

    expect(result).toBe('2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6');
  });

  test('should handle base of 1', () => {
    const base = 1;
    const limit = 3;
    const result = createTable.execute({ base, limit });

    expect(result).toContain('1 x 1 = 1');
    expect(result).toContain('1 x 2 = 2');
    expect(result).toContain('1 x 3 = 3');
  });

  test('should handle large numbers', () => {
    const base = 99;
    const limit = 2;
    const result = createTable.execute({ base, limit });

    expect(result).toContain('99 x 1 = 99');
    expect(result).toContain('99 x 2 = 198');
  });
});
