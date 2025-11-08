import { ClassConstructor, plainToInstance } from 'class-transformer';

/**
 * Serialize plain object(s) to DTO instance(s) with strict transformation
 */
export function serializeDto<T>(
  dtoClass: ClassConstructor<T>,
  plain: unknown[],
): T[];

export function serializeDto<T>(
  dtoClass: ClassConstructor<T>,
  plain: unknown,
): T;

export function serializeDto<T>(
  dtoClass: ClassConstructor<T>,
  plain: unknown,
): T | T[] {
  return plainToInstance(dtoClass, plain, {
    excludeExtraneousValues: true,
  });
}
