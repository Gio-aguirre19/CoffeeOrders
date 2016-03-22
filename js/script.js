$(function(){
  var $orders=$('#orders');
  var $name=$('#name');
  var $drink=$("#drink");
  var orderTemplate = $('#order-template').html();
  function addOrder(order){
    $orders.prepend(Mustache.render(orderTemplate, order));
  }

  $.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/user/orders-test',
    success: function(orders) {
      $.each(orders, function(i, order){
        addOrder(order);
      });
    }
  });
  $('#addOrder').on('click', function(){
    var order = {
      name: $name.val(),
      drink: $drink.val(),
    };
    if(order.name == '' && order.drink == ''){
      $name.css('border-color', "#F00");
      $drink.css('border-color', "#F00");
    }else if(order.name == ''){
      $name.css('border-color', "#F00");
    }else if(order.drink == ''){
      $drink.css('border-color', "#F00");
    }else{
      $name.css('border-color', "#000");
      $drink.css('border-color', "#000");
      $name.val('');
      $drink.val('');
      $.ajax({
        host: 'http://rest.learncode.academy',
        type: 'POST',
        url: 'http://rest.learncode.academy/api/user/orders-test',
        data: order,
        success: function(newOrder) {
          addOrder(newOrder);
        }
      });
  };
  });
  $orders.delegate('.remove', 'click', function(){
    var $li = $(this).closest('li');
    $.ajax({
      type: 'DELETE',
      url: 'http://rest.learncode.academy/api/user/orders-test/' + $(this).attr('data-id'),
      success: function(){
        $li.fadeOut(500, function(){
          $(this).remove();
        });
      }
    });
  });
  $orders.delegate('.editOrder', 'click', function(){
    var $li = $(this).closest('li');
    $li.find('input.name').val($li.find('span.name').html());
    $li.find('input.drink').val($li.find('span.drink').html());
    $li.addClass('edit');
  });
  $orders.delegate('.cancelEdit', 'click', function(){
    $(this).closest('li').removeClass('edit');
  });
  $orders.delegate('.saveEdit', 'click', function(){
    var $li = $(this).closest('li');
    var order = {
      name: $li.find('input.name').val(),
      drink: $li.find('input.drink').val()
    };
    $.ajax({
      type: 'PUT',
      url: 'http://rest.learncode.academy/api/user/orders-test/' + $li.attr('data-id'),
      data: order,
      success: function(newOrder){
        $li.find('span.name').html(order.name);
        $li.find('span.drink').html(order.drink);
        $li.removeClass('edit');
      }
    })
  });
});
