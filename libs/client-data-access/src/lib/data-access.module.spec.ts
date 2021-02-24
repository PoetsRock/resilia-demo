import { async, TestBed } from '@angular/core/testing';
import { DataAccessModule } from './data-access.module';

describe('DataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(DataAccessModule).toBeDefined();
  });
});
