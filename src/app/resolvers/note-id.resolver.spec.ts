import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { noteIdResolver } from './note-id.resolver';

describe('noteIdResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => noteIdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
