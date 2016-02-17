/**
 * OLCS.idleModal
 *
 * Alert a message to let users know that they will soon be automatically
 * logged out if they continue to be idle
 * 
 * grunt test:single --target=idleModal
 */

describe("OLCS.idleModal", function() {
  
  "use strict";

  beforeEach(function() {
    this.component = OLCS.idleModal;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });
  
  describe("given a rendered page", function() {
      
    beforeEach(function() {
      this.component({
        inactivityTime : 0.2,
        inactivityRemaining : 0.15
      });
    });  
    
    afterEach(function() {
      OLCS.modal.hide();
    });
    
    describe("when a user becomes idle", function() {
      
      it("the dialog popup should be visible", function(done) {
        setTimeout(function () {
          expect($(".modal").length).to.be(1);
          done();
        }, 1900);    
      });  
         
      it("the modal title should be accurate", function() {
        expect($("#modal-title").html()).to.be("You will soon be logged out");
      });         
            
    });   
      
  });     
          
});