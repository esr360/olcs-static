describe("OLCS.notices", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.notices;
  });

  it("should be a function", function() {
    expect(this.component).to.be.a("function");
  });

  describe("Given a stubbed DOM with more than one notice", function() {
    beforeEach(function() {
      $("body").append([
        "<div id=stub>",
          "<div class=notice-container>",
            "<div class=notice--success>",
              "<p>Message<a href=# class=notice__link id=l1>Close</a></p>",
            "</div>",
            "<div class=notice--danger>",
              "<p>Message<a href=# class=notice__link id=l2>Close</a></p>",
            "</div>",
          "</div>",
        "</div>"
      ].join("\n"));
    });

    afterEach(function() {
      $("#stub").remove();
    });

    describe("Given a fake clock", function() {
      beforeEach(function() {
        this.clock = sinon.useFakeTimers();
      });
      
      afterEach(function() {
        this.clock.restore();
      });

      describe("When invoked", function() {
        beforeEach(function() {
          this.component();
        });

        describe("When the first close button is clicked", function() {
          beforeEach(function() {
            $("#l2").click();
          });

          it("It removes the expected element", function() {
            expect($(".notice--danger").length).to.equal(0);
            expect($(".notice--success").length).to.equal(1);
            expect($(".notice-container").length).to.equal(1);
          });

          describe("When the last remaining element's close button is clicked", function() {
            beforeEach(function() {
              $("#l1").click();
            });

            it("It removes the container from them DOM", function() {
              expect($(".notice-container").length).to.equal(0);
            });
          });
        });

        describe("After 6400ms seconds has passed", function() {
          beforeEach(function(){
            this.clock.tick(6400);
          });

          it("It removes the container from them DOM", function() {
            expect($(".notice-container").length).to.equal(0);    
          });
        });
      });
    });
  });

  describe("Given a stubbed DOM with the class of 'modal'", function() {
    beforeEach(function() {
      $("body").append([
        "<div class=modal>",
          "<div class=notice-container>",
            "<div class=notice--success>",
              "<p>Message<a href=# class=notice__link id=l1>Close</a></p>",
            "</div>",
          "</div>",
        "</div>"
      ].join("\n"));
    });

    afterEach(function() {
      $(".modal").remove();
    });

    describe("Given a fake clock", function() {
      beforeEach(function() {
        this.clock = sinon.useFakeTimers();
      });
      
      afterEach(function() {
        this.clock.restore();
      });

      describe("When invoked", function() {
        beforeEach(function() {
          this.component();
        });

        describe("After 6400ms seconds has passed", function() {
          beforeEach(function(){
            this.clock.tick(6400);
          });

          it("The notice container should still be present", function() {
            expect($(".notice-container").length).to.equal(1);    
          });
        });
      });
    });
  });
});