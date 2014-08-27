describe("OLCS.modal", function() {
  "use strict";

  beforeEach(function() {
    this.component = OLCS.modal;
  });

  it("should be defined", function() {
    expect(this.component).to.exist;
  });

  it("should expose the correct public interface", function() {
    expect(this.component.show).to.be.a("function");
    expect(this.component.hide).to.be.a("function");
    expect(this.component.off).to.be.a("function");
    expect(this.component.emit).to.be.a("function");
  });

  describe("show", function() {
    beforeEach(function() {
      this.component.show("body here", "title here");
    });

    it("shows the modal overlay", function() {
      expect($(".overlay").is(":visible")).to.be(true);
    });

    it("shows the modal wrapper", function() {
      expect($(".modal__wrapper").is(":visible")).to.be(true);
    });

    it("applies the correct title", function() {
      expect($(".modal__title").text()).to.equal("title here");
    });

    it("applies the correct body", function() {
      expect($(".modal__content").text()).to.equal("body here");
    });

    describe("hide", function() {
      beforeEach(function() {
        this.eventSpy = sinon.spy(OLCS.eventEmitter, "emit");
        this.component.hide();
      });

      afterEach(function() {
        this.eventSpy.restore();
      });

      it("hides the modal overlay", function() {
        expect($(".overlay").is(":visible")).to.be(false);
      });

      it("hides the modal wrapper", function() {
        expect($(".modal__wrapper").is(":visible")).to.be(false);
      });

      it("emits the correct event", function() {
        expect(this.eventSpy.firstCall.args[0]).to.equal("hide:modal");
      });
    });

    describe("When clicking the modal close button", function() {
      beforeEach(function() {
        this.spy = sinon.stub(this.component, "hide");
        $(".modal__close").click();
      });

      afterEach(function() {
        this.spy.restore();
      });

      it("invokes the modal's hide method", function() {
        expect(this.spy.called).to.be(true);
      });
    });
  });
});
