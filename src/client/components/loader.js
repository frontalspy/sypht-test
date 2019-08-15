export function toggleLoad(spinning) {
  if(spinning === "load") {
    document.getElementById('loader').classList.remove('hide');
  } else {
    document.getElementById('loader').classList.add('hide');
  }
}