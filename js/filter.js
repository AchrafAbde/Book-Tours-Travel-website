
  document.getElementById('length-range').addEventListener('input', function() {
    var lengthValue = this.value;
    document.getElementById('length-value').textContent = lengthValue + (lengthValue > 1 ? ' days' : ' day');
  });
