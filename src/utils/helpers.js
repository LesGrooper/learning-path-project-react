class HelperGlobal {
  /**
 * Debounce a function call by a given delay.
 */
  debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  /**
   * Format a number as USD currency.
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  /**
   * Truncate a string to maxLength, appending "..." if needed.
   */
  truncate(str, maxLength = 60) {
    if (!str) return '';
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  }

  isSetValue = (value) => {
    return typeof value !== 'undefined' && value !== null;
  }

  isEmpty = (value) => {
    if(!this.isSetValue(value)) return true;
    
    if(typeof value === 'object') {
      return Object.keys(value).length === 0;
    } 
    if (value === Array.isArray(value)) {
      return value.length === 0;
    }
    if (typeof value === 'string' ) {
      return value === "";
    }
    if (typeof value === 'number') {
      return value === 0;
    }
    return false;
  }
}

const helperGlobal = new HelperGlobal();
export default helperGlobal;