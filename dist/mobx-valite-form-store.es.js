/*!
 * mobx-valite-form-store v0.0.0
 * (c) 2018-present Vitor Luiz Cavalcanti <vitorluizc@outlook.com> (https://vitorluizc.github.io)
 * Released under the MIT License.
 */
import { validate, validateProperties, isValid } from 'valite';
import { observable, action, computed } from 'mobx';

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { r = Reflect.decorate(decorators, target, key, desc); }else { for (var i = decorators.length - 1; i >= 0; i--) { if (d = decorators[i]) { r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r; } } }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormStore = function FormStore(entries, validators) {
  if ( validators === void 0 ) validators = {};

  this.ticks = 0;
  this.errors = {};
  this.validators = {};
  this.SET_ENTRIES(entries);
  this.validators = validators;
};

var prototypeAccessors = { isLoading: { configurable: true },isValid: { configurable: true } };

prototypeAccessors.isLoading.get = function () {
  return this.ticks > 0;
};

prototypeAccessors.isValid.get = function () {
  return isValid(this.errors);
};

FormStore.prototype.setEntry = function setEntry (entry, value) {
  this.SET_ENTRY(entry, value);
  this.validateEntry(entry, value);
};

FormStore.prototype.validateEntry = function validateEntry (entry, value) {
  return new Promise(function ($return, $error) {
    this.SET_LOADING();

    var $Try_1_Post = function () {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    };

    var $Try_1_Catch = function (error) {
      try {
        this.UNSET_LOADING();
        throw error;
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this);

    try {
      var error$1;
      return Promise.resolve(validate(value, this.validators[entry])).then(function ($await_3) {
        try {
          error$1 = $await_3;
          this.SET_ERROR(entry, error$1);
          this.UNSET_LOADING();
          return $Try_1_Post();
        } catch ($boundEx) {
          return $Try_1_Catch($boundEx);
        }
      }.bind(this), $Try_1_Catch);
    } catch (error) {
      $Try_1_Catch(error);
    }
  }.bind(this));
};

FormStore.prototype.validateEntries = function validateEntries () {
  return new Promise(function ($return, $error) {
    this.SET_LOADING();

    var $Try_2_Post = function () {
      try {
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    };

    var $Try_2_Catch = function (error) {
      try {
        this.UNSET_LOADING();
        throw error;
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this);

    try {
      var errors;
      return Promise.resolve(validateProperties(this.entries, this.validators)).then(function ($await_4) {
        try {
          errors = $await_4;
          this.SET_ERRORS(errors);
          this.UNSET_LOADING();
          return $Try_2_Post();
        } catch ($boundEx) {
          return $Try_2_Catch($boundEx);
        }
      }.bind(this), $Try_2_Catch);
    } catch (error) {
      $Try_2_Catch(error);
    }
  }.bind(this));
};

FormStore.prototype.SET_LOADING = function SET_LOADING () {
  this.ticks++;
};

FormStore.prototype.UNSET_LOADING = function UNSET_LOADING () {
  this.ticks--;
};

FormStore.prototype.SET_ERROR = function SET_ERROR (entry, error) {
  this.errors[entry] = error;
};

FormStore.prototype.SET_ERRORS = function SET_ERRORS (errors) {
  this.errors = errors;
};

FormStore.prototype.SET_ENTRY = function SET_ENTRY (entry, value) {
  this.entries[entry] = value;
};

FormStore.prototype.SET_ENTRIES = function SET_ENTRIES (entries) {
  this.entries = entries;
};

Object.defineProperties( FormStore.prototype, prototypeAccessors );

__decorate([observable], FormStore.prototype, "ticks", void 0);

__decorate([observable], FormStore.prototype, "errors", void 0);

__decorate([observable], FormStore.prototype, "entries", void 0);

__decorate([observable], FormStore.prototype, "validators", void 0);

__decorate([computed], FormStore.prototype, "isLoading", null);

__decorate([computed], FormStore.prototype, "isValid", null);

__decorate([action('SET_LOADING')], FormStore.prototype, "SET_LOADING", null);

__decorate([action('UNSET_LOADING')], FormStore.prototype, "UNSET_LOADING", null);

__decorate([action('SET_ERROR')], FormStore.prototype, "SET_ERROR", null);

__decorate([action('SET_ERRORS')], FormStore.prototype, "SET_ERRORS", null);

__decorate([action('SET_ENTRY')], FormStore.prototype, "SET_ENTRY", null);

__decorate([action('SET_ENTRIES')], FormStore.prototype, "SET_ENTRIES", null);

export default FormStore;
