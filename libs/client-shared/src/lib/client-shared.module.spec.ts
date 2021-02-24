import { async, TestBed } from '@angular/core/testing';
import { ClientSharedModule } from './client-shared.module';

describe('ClientSharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientSharedModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientSharedModule).toBeDefined();
  });
});
