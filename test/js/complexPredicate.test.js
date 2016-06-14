/*/**
 * OLCS.complexPredicate
 *
 * grunt test:single --target=complexPredicate
 */

describe('OLCS.complexPredicate', function() {

  'use strict';

  beforeEach(function() {
    this.component = OLCS.complexPredicate;
  });

  it('should be a function', function() {
    expect(this.component).to.be.a('function');
  });

  describe('Given a stubbed DOM', function() {

    beforeEach(function() {
      $('body').append([
        '<form id="stub" method="post" action="/baz">',
          '<input type="checkbox" checked />',
          '<div class=actions-container>',
            '<button type="submit" value="Submit" disabled>Submit</button>',
          '</div>',
        '</form>'
      ].join('\n'));
    });

    afterEach(function() {
      $('#stub').remove();
    });

    describe('When the component is initialised with valid options', function() {

      beforeEach(function() {
        this.component({
          max  : 1,
          attr : 'disabled'
        });
      });

      it('should add the disabled attribute', function() {
        expect($('#stub button').attr('disabled')).to.be('disabled')
      });

    });

    describe('When the component is initialised with valid options', function() {

      beforeEach(function() {
        this.component([
          '#foo', '#bar', '#baz'
        ]);
      });

      it('should add the disabled attribute', function() {
        expect($('#stub button').attr('disabled')).to.be('disabled')
      });

    });

    describe('When the component is initialised with valid options', function() {

      beforeEach(function() {
        var inputs = $('#stub [type="checkbox"]:checked');
        this.component(inputs.length, function(enabled) {
          if (enabled) {
            $('#stub button').removeAttr('disabled');
          } else {
            $('#stub button').attr('disabled', true);
          }
        }, inputs);
      });
        
      it('should add the disabled attribute', function() {
        expect($('#stub button').attr('disabled')).to.be('disabled')
      });

    });

  });

});