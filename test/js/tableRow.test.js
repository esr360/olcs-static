describe('OLCS.tableRows', function() {
  'use strict';

  beforeEach(function() {
    this.component = OLCS.tableRows;
  });

  it('should be defined', function() {
    expect(this.component).to.exist;
  });

  it('should be a function', function() {
    expect(this.component).to.be.a('function');
  });

  describe('Given a stubbed DOM with a table', function() {
    beforeEach(function() {
      var table = [
        '<table id="table1">',
          '<thead>',
            '<th>Variation No.</th>',
            '<th>Received</th>',
            '<th>Effective</th>',
            '<th>End</th>',
          '</thead>',
          '<tbody>',
            '<tr>',
              '<td><a href="licences.html">5</a></td>',
              '<td>12 May 2012</td>',
              '<td>12 August 2012</td>',
              '<td>12 August 2013</td>',
            '</tr>',
            '<tr>',
              '<td><a href="licences.html">4</a></td>',
              '<td>12 May 2012</td>',
              '<td><input type="submit" value="12 August 2012"></td>',
              '<td>12 August 2013</td>',
            '</tr>',
            '<tr>',
              '<td><input type="submit" name="edit" value="3"></td>',
              '<td>12 May 2012</td>',
              '<td>12 August 2012</td>',
              '<td>12 August 2013</td>',
            '</tr>',
            '<tr>',
              '<td><input type="submit" name="edit" value="2"></td>',
              '<td>12 May 2012</td>',
              '<td><input type="submit" name="edit" value="12 August 2012"></td>',
              '<td>12 August 2013</td>',
            '</tr>',
            '<tr>',
              '<td><a href="licences.html">1</a></td>',
              '<td>12 May 2012</td>',
              '<td><a href="">12 August 2012</a></td>',
              '<td>12 August 2013</td>',
            '</tr>',
          '</tbody>',
        '</table>'
      ].join("\n");

      this.body = $('body');

      this.body.append(table);

      this.on = sinon.spy($.fn, 'on');
    });

    afterEach(function() {
      this.on.restore();
      $('#table1').remove();
    });

    describe('When initialised with default options', function() {
      beforeEach(function() {
        this.component();
      });

  //     afterEach(function() {
  //       $(document).off('change');
  //     });

  //     describe('When the checkall checkbox is checked', function() {
  //       beforeEach(function() {
  //         $('#table1').find('input[name="checkall"]').prop('checked', true).trigger('change');
  //       });

  //       it('should check all other checkboxes', function() {
  //         $('#table1').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(true);
  //         });
  //       });

  //       it('should not check checkboxes from the other table', function() {
  //         $('#table2').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(false);
  //         });
  //       });
  //     });

  //     describe('When the checkall checkbox is checked and then unchecked', function() {
  //       beforeEach(function() {
  //         $('#table1').find('input[name="checkall"]').prop('checked', true).trigger('change');
  //         $('#table1').find('input[name="checkall"]').prop('checked', false).trigger('change');
  //       });

  //       it('should uncheck all other checkboxes', function() {
  //         $('#table1').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(false);
  //         });
  //       });

  //       it('should not check checkboxes from the other table', function() {
  //         $('#table2').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(false);
  //         });
  //       });
  //     });

  //     describe('When another checkbox within the table is checked', function() {
  //       beforeEach(function() {
  //         $('#table1').find('input[type="checkbox"]').not('input[name="checkall"]').first().prop('checked', true)
  //           .trigger('change');
  //       });

  //       it('should have no effect on any other checkboxes', function() {
  //         expect(
  //           $('#table1').find('input[type="checkbox"]').not('input[name="checkall"]').eq(1).is(':checked')
  //         ).to.be(false);
  //       });
  //     });

  //     describe('When the checkall checkbox in table2 is checked and there is already a checked checkbox', function() {
  //       beforeEach(function() {
  //         $('#table2').find('input[type="checkbox"]').not('input[name="checkall"]').first().prop('checked', true)
  //           .trigger('change');
  //         $('#table2').find('input[name="checkall"]').prop('checked', true).trigger('change');
  //       });

  //       it('should check all checkboxes including the originally checked checkbox', function() {
  //         $('#table2').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(true);
  //         });
  //       });

  //       it('should not check checkboxes from the other table', function() {
  //         $('#table1').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(false);
  //         });
  //       });
  //     });

  //     describe('When the checkall checkbox in table2 is unchecked and there is already an unchecked checkbox', function() {
  //       beforeEach(function() {
  //         $('#table2').find('input[name="checkall"]').prop('checked', true).trigger('change');
  //         $('#table2').find('input[type="checkbox"]').not('input[name="checkall"]').first().prop('checked', false)
  //           .trigger('change');
  //         $('#table2').find('input[name="checkall"]').prop('checked', false).trigger('change');
  //       });

  //       it('should check all checkboxes including the originally checked checkbox', function() {
  //         $('#table2').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(false);
  //         });
  //       });

  //       it('should not check checkboxes from the other table', function() {
  //         $('#table1').find('input[type="checkbox"]').not('input[name="checkall"]').each(function() {
  //           expect($(this).is(':checked')).to.be(false);
  //         });
  //       });
  //     });
  //   });
  });
});