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
  
  var timeout = 500;
    
  var options = {
    inactivityTime      : 0.02,
    inactivityRemaining : 0.019,
    modalTitle          : 'You will soon be logged out',
    modalMessage        : 'Due to inactivity you will soon be automatically logged out. To remain logged in, simply dismiss this alert message.',
    dismissMessage      : 'Dismiss',
    loggingOutMessage   : 'Logging Out...'
  }

  beforeEach(function() {
    this.component = OLCS.idleModal;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });
  
  describe("given a rendered page", function() {
      
    beforeEach(function() {
      this.component(options);
    });  
    
    afterEach(function() {
      OLCS.modal.hide();
    });  
        
    it("should wait for user to be considered idle", function(done) {
      setTimeout(done, timeout);    
    }); 
    
    describe("when a user becomes idle", function() {  
         
      it("the modal should be opened", function(done) {
        setTimeout(function () {
          expect($(".modal").length).to.be(1); done();
        }, timeout); 
      });
         
      it("the modal title should be accurate", function(done) {
        setTimeout(function () {
          expect($("#modal-title").text()).to.be(options.modalTitle); done();
        }, timeout); 
      }); 
         
      it("the modal content should be accurate", function(done) {
        setTimeout(function () {
          expect($(".modal__content").find('p:first').text()).to.be(options.modalMessage); done();
        }, timeout); 
      });  
         
      it("the dismiss button text should be accurate", function(done) {
        setTimeout(function () {
          expect($("#idlePopupDismiss").text()).to.be(options.dismissMessage); done();
        }, timeout); 
      });  
         
      it("the countdown should start", function(done) {
        setTimeout(function () {
          expect($("#countdownTimer").text()).to.not.be(''); 
          expect($("#countdownTimer").text()).to.not.be('00:00:00'); 
          expect($("#countdownTimer").text()).to.not.be(options.loggingOutMessage); 
          done();
        }, timeout); 
      }); 
      
      describe("when the user presses the dismiss button", function() {   
             
        beforeEach(function() {
          $("#idlePopupDismiss").click();
        }); 
        
        it("the modal should be closed", function() {
          expect($(".modal").length).to.be(0);
        });
         
      });   
            
    }); 
      
  });     
          
});