import { async, TestBed } from '@angular/core/testing';
import { ClientUserModule } from './client-user.module';

describe('ClientUserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientUserModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientUserModule).toBeDefined();
  });
});
