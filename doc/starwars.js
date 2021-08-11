"use strict";
var starwars_dispatch;
(function() {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    if (to.$meta.item !== null) {
        return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_createArray(cls, sz) {
    var data = new Array(sz);
    var arr = new $rt_array(cls, data);
    if (sz > 0) {
        var i = 0;
        do  {
            data[i] = null;
            i = i + 1 | 0;
        }while (i < sz);
    }
    return arr;
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new Array(sz));
}
function $rt_createLongArray(sz) {
    var data = new Array(sz);
    var arr = new $rt_array($rt_longcls(), data);
    for (var i = 0;i < sz;i = i + 1 | 0) {
        data[i] = Long_ZERO;
    }
    return arr;
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new Uint16Array(sz));
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new Int8Array(sz));
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new Int16Array(sz));
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new Int32Array(sz));
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new Int8Array(sz));
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new Float32Array(sz));
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new Float64Array(sz));
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        err = new Error("Java exception thrown");
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_objcls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && isNaN(value)) {
        throw "NaN";
    }
    return value;
}
var $rt_stdoutBuffer = "";
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.info($rt_stdoutBuffer);
        }
        $rt_stdoutBuffer = "";
    } else {
        $rt_stdoutBuffer += String.fromCharCode(ch);
    }
};
var $rt_stderrBuffer = "";
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.error($rt_stderrBuffer);
        }
        $rt_stderrBuffer = "";
    } else {
        $rt_stderrBuffer += String.fromCharCode(ch);
    }
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_threadStarter(f) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new DataView(new ArrayBuffer(8));
function $rt_doubleToLongBits(n) {
    $rt_numberConversionView.setFloat64(0, n, true);
    return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
}
function $rt_longBitsToDouble(n) {
    $rt_numberConversionView.setInt32(0, n.lo, true);
    $rt_numberConversionView.setInt32(4, n.hi, true);
    return $rt_numberConversionView.getFloat64(0, true);
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
function $rt_javaException(e) {
    return e instanceof Error && typeof e.$javaException === 'object' ? e.$javaException : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err.$javaException;
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
Long.prototype.toString = function() {
    var result = [];
    var n = this;
    var positive = Long_isPositive(n);
    if (!positive) {
        n = Long_neg(n);
    }
    var radix = new Long(10, 0);
    do  {
        var divRem = Long_divRem(n, radix);
        result.push(String.fromCharCode(48 + divRem[1].lo));
        n = divRem[0];
    }while (n.lo !== 0 || n.hi !== 0);
    result = (result.reverse()).join('');
    return positive ? result : "-" + result;
};
Long.prototype.valueOf = function() {
    return Long_toNumber(this);
};
var Long_ZERO = new Long(0, 0);
var Long_MAX_NORMAL = 1 << 18;
function Long_fromInt(val) {
    return val >= 0 ? new Long(val, 0) : new Long(val,  -1);
}
function Long_fromNumber(val) {
    if (val >= 0) {
        return new Long(val | 0, val / 0x100000000 | 0);
    } else {
        return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
    }
}
function Long_toNumber(val) {
    var lo = val.lo;
    var hi = val.hi;
    if (lo < 0) {
        lo += 0x100000000;
    }
    return 0x100000000 * hi + lo;
}
var $rt_imul = Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a / b | 0;
};
var $rt_umod = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a % b | 0;
};
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return null;
}
function $rt_setThread(t) {
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
var $java = Object.create(null);
function jl_Object() {
    this.$id$ = 0;
}
function jl_Object__init_() {
    var var_0 = new jl_Object();
    jl_Object__init_0(var_0);
    return var_0;
}
function jl_Object__init_0($this) {
    return;
}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_toString($this) {
    return jl_StringBuilder__init_().$append(jl_Object_getClass($this).$getName()).$append($rt_s(0)).$append(jl_Integer_toHexString(jl_Object_identity($this))).$toString();
}
function jl_Object_identity($this) {
    var $platformThis, var$2;
    $platformThis = $this;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return $this.$id$;
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_() {
    var var_0 = new jl_Throwable();
    jl_Throwable__init_0(var_0);
    return var_0;
}
function jl_Throwable__init_1(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_2(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
}
function jl_Throwable__init_2($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
function jl_Exception() {
    jl_Throwable.call(this);
}
function jl_Exception__init_() {
    var var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
}
function jl_Exception__init_1(var_0) {
    var var_1 = new jl_Exception();
    jl_Exception__init_2(var_1, var_0);
    return var_1;
}
function jl_Exception__init_0($this) {
    jl_Throwable__init_0($this);
}
function jl_Exception__init_2($this, $message) {
    jl_Throwable__init_2($this, $message);
}
function jl_RuntimeException() {
    jl_Exception.call(this);
}
function jl_RuntimeException__init_0() {
    var var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_1(var_0);
    return var_0;
}
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_2(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_1($this) {
    jl_Exception__init_0($this);
}
function jl_RuntimeException__init_2($this, $message) {
    jl_Exception__init_2($this, $message);
}
function jl_IndexOutOfBoundsException() {
    jl_RuntimeException.call(this);
}
function jl_IndexOutOfBoundsException__init_() {
    var var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_IndexOutOfBoundsException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jl_IllegalStateException() {
    jl_Exception.call(this);
}
function jl_IllegalStateException__init_() {
    var var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_0(var_0);
    return var_0;
}
function jl_IllegalStateException__init_0($this) {
    jl_Exception__init_0($this);
}
function ju_Arrays() {
    jl_Object.call(this);
}
function ju_Arrays_copyOf($array, $length) {
    var var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
}
function ju_Iterator() {
}
function ju_ListIterator() {
}
function ju_HashMap$AbstractMapIterator() {
    var a = this; jl_Object.call(a);
    a.$position = 0;
    a.$expectedModCount = 0;
    a.$futureEntry = null;
    a.$currentEntry = null;
    a.$prevEntry = null;
    a.$associatedMap = null;
}
function ju_HashMap$AbstractMapIterator__init_(var_0) {
    var var_1 = new ju_HashMap$AbstractMapIterator();
    ju_HashMap$AbstractMapIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$AbstractMapIterator__init_0($this, $hm) {
    jl_Object__init_0($this);
    $this.$associatedMap = $hm;
    $this.$expectedModCount = $hm.$modCount;
    $this.$futureEntry = null;
}
function ju_HashMap$AbstractMapIterator_hasNext($this) {
    if ($this.$futureEntry !== null)
        return 1;
    while ($this.$position < $this.$associatedMap.$elementData.data.length) {
        if ($this.$associatedMap.$elementData.data[$this.$position] !== null)
            return 1;
        $this.$position = $this.$position + 1 | 0;
    }
    return 0;
}
function ju_HashMap$AbstractMapIterator_checkConcurrentMod($this) {
    if ($this.$expectedModCount == $this.$associatedMap.$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function ju_HashMap$AbstractMapIterator_makeNext($this) {
    var var$1, var$2;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    if ($this.$futureEntry === null) {
        var$1 = $this.$associatedMap.$elementData.data;
        var$2 = $this.$position;
        $this.$position = var$2 + 1 | 0;
        $this.$currentEntry = var$1[var$2];
        $this.$futureEntry = $this.$currentEntry.$next;
        $this.$prevEntry = null;
    } else {
        if ($this.$currentEntry !== null)
            $this.$prevEntry = $this.$currentEntry;
        $this.$currentEntry = $this.$futureEntry;
        $this.$futureEntry = $this.$futureEntry.$next;
    }
}
function ju_HashMap$AbstractMapIterator_remove($this) {
    var $index, var$2;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if ($this.$currentEntry === null)
        $rt_throw(jl_IllegalStateException__init_());
    if ($this.$prevEntry !== null)
        $this.$prevEntry.$next = $this.$currentEntry.$next;
    else {
        $index = $this.$currentEntry.$origKeyHash & ($this.$associatedMap.$elementData.data.length - 1 | 0);
        $this.$associatedMap.$elementData.data[$index] = $this.$associatedMap.$elementData.data[$index].$next;
    }
    $this.$currentEntry = null;
    $this.$expectedModCount = $this.$expectedModCount + 1 | 0;
    var$2 = $this.$associatedMap;
    var$2.$modCount = var$2.$modCount + 1 | 0;
    var$2 = $this.$associatedMap;
    var$2.$elementCount = var$2.$elementCount - 1 | 0;
}
function jl_Iterable() {
}
function ju_Collection() {
}
function ju_AbstractCollection() {
    jl_Object.call(this);
}
function ju_AbstractCollection__init_() {
    var var_0 = new ju_AbstractCollection();
    ju_AbstractCollection__init_0(var_0);
    return var_0;
}
function ju_AbstractCollection__init_0($this) {
    jl_Object__init_0($this);
}
function ju_AbstractCollection_retainAll($this, $c) {
    var $changed, $iter, $e;
    $changed = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $e = $iter.$next0();
        if (!$c.$contains($e)) {
            $iter.$remove();
            $changed = 1;
        }
    }
    return $changed;
}
function ju_List() {
}
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount0 = 0;
}
function ju_AbstractList__init_() {
    var var_0 = new ju_AbstractList();
    ju_AbstractList__init_0(var_0);
    return var_0;
}
function ju_AbstractList__init_0($this) {
    ju_AbstractCollection__init_0($this);
}
function ju_AbstractList_add($this, $e) {
    $this.$add($this.$size(), $e);
    return 1;
}
function ji_Serializable() {
}
function ju_Random() {
    jl_Object.call(this);
}
function ju_Random__init_() {
    var var_0 = new ju_Random();
    ju_Random__init_0(var_0);
    return var_0;
}
function ju_Random__init_0($this) {
    jl_Object__init_0($this);
}
function ju_Random_setSeed($this, $seed) {
    return;
}
function ju_Random_next($this, $bits) {
    if ($bits == 32)
        return $this.$nextDouble() * 4.294967295E9 + (-2.147483648E9) | 0;
    return $this.$nextDouble() * Long_toNumber(Long_shl(Long_fromInt(1), jl_Math_min(32, $bits))) | 0;
}
function ju_Random_nextInt($this) {
    return $this.$next1(32);
}
function ju_Random_nextInt0($this, $n) {
    return $this.$nextDouble() * $n | 0;
}
function ju_Random_nextBoolean($this) {
    return $this.$nextInt() % 2 | 0 ? 0 : 1;
}
function ju_Random_nextDouble($this) {
    return Math.random();
}
function nitj_JSApp() {
    jl_Object.call(this);
}
var nitj_JSApp_game = null;
function nitj_JSApp_dispatch($args) {
    var var$2, $returnValue, var$4, var$5, var$6;
    a: {
        var$2 = $args.data;
        $returnValue = null;
        var$4 = var$2[0];
        var$5 = (-1);
        switch (var$4.$hashCode()) {
            case 3237136:
                if (!var$4.$equals($rt_s(1)))
                    break a;
                var$5 = 0;
                break a;
            case 3357649:
                if (!var$4.$equals($rt_s(2)))
                    break a;
                var$5 = 1;
                break a;
            default:
        }
    }
    b: {
        switch (var$5) {
            case 0:
                break;
            case 1:
                $returnValue = nitj_JSApp_move(var$2[1]).$toString();
                break b;
            default:
                var$4 = var$2[0];
                var$6 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$6, $rt_s(3)), var$4), $rt_s(4));
                console.log($rt_ustr(jl_StringBuilder_toString(var$6)));
                break b;
        }
        nitj_JSApp_init();
    }
    saveReturnValue($rt_ustr($returnValue));
}
function nitj_JSApp_init() {
    var $jsCanvas;
    $jsCanvas = nitj_JSApp$JSCanvas__init_();
    nitj_JSApp_game.$init0($jsCanvas, Long_ZERO);
}
function nitj_JSApp_move($key) {
    var var$2, $ekey, var$4;
    a: {
        var$2 = (-1);
        switch ($key.$hashCode()) {
            case 0:
                if (!$key.$equals($rt_s(5)))
                    break a;
                var$2 = 0;
                break a;
            case 80085222:
                if (!$key.$equals($rt_s(6)))
                    break a;
                var$2 = 3;
                break a;
            case 251549619:
                if (!$key.$equals($rt_s(7)))
                    break a;
                var$2 = 1;
                break a;
            case 977763216:
                if (!$key.$equals($rt_s(8)))
                    break a;
                var$2 = 2;
                break a;
            default:
        }
    }
    b: {
        switch (var$2) {
            case 0:
                break;
            case 1:
                nitc_EventDriver$Key_$callClinit();
                $ekey = nitc_EventDriver$Key_RIGHT;
                break b;
            case 2:
                nitc_EventDriver$Key_$callClinit();
                $ekey = nitc_EventDriver$Key_LEFT;
                break b;
            case 3:
                nitc_EventDriver$Key_$callClinit();
                $ekey = nitc_EventDriver$Key_SPC;
                break b;
            default:
                var$4 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$4, $rt_s(9)), $key), $rt_s(10));
                console.log($rt_ustr(jl_StringBuilder_toString(var$4)));
                nitc_TerminalGame$Status_$callClinit();
                return nitc_TerminalGame$Status_CONT;
        }
        $ekey = null;
    }
    return nitj_JSApp_game.$move0($ekey);
}
function jl_Number() {
    jl_Object.call(this);
}
function jl_Number__init_() {
    var var_0 = new jl_Number();
    jl_Number__init_0(var_0);
    return var_0;
}
function jl_Number__init_0($this) {
    jl_Object__init_0($this);
}
function jl_Comparable() {
}
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
var jl_Integer_TYPE = null;
var jl_Integer_integerCache = null;
function jl_Integer_$callClinit() {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
}
function jl_Integer__init_(var_0) {
    var var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
}
function jl_Integer__init_0($this, $value) {
    jl_Integer_$callClinit();
    jl_Number__init_0($this);
    $this.$value = $value;
}
function jl_Integer_toHexString($i) {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
}
function jl_Integer_valueOf($i) {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_($i);
}
function jl_Integer_ensureIntegerCache() {
    var $j;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= jl_Integer_integerCache.data.length)
                    break a;
                jl_Integer_integerCache.data[$j] = jl_Integer__init_($j - 128 | 0);
                $j = $j + 1 | 0;
            }
        }
    }
}
function jl_Integer_hashCode($this) {
    return $this.$value >>> 4 ^ $this.$value << 28 ^ $this.$value << 8 ^ $this.$value >>> 24;
}
function jl_Integer_equals($this, $other) {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $other.$value == $this.$value ? 1 : 0;
}
function jl_Integer_numberOfLeadingZeros($i) {
    var $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
}
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
function nitc_TerminalGame() {
}
function juf_Predicate() {
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_0__init_(var_0) {
    var var_1 = new nitsg_SWGame$missile_x_bomb$lambda$_4_0();
    nitsg_SWGame$missile_x_bomb$lambda$_4_0__init_0(var_1, var_0);
    return var_1;
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_0 = var$1;
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_0_test(var$0, var$1) {
    return nitsg_SWGame$missile_x_bomb$lambda$_4_0_test0(var$0, var$1);
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_0_test0(var$0, var$1) {
    return nitsg_SWGame_lambda$missile_x_bomb$3(var$0.$_0, var$1);
}
function jl_Error() {
    jl_Throwable.call(this);
}
function jl_Error__init_(var_0) {
    var var_1 = new jl_Error();
    jl_Error__init_0(var_1, var_0);
    return var_1;
}
function jl_Error__init_0($this, $message) {
    jl_Throwable__init_2($this, $message);
}
function jl_LinkageError() {
    jl_Error.call(this);
}
function jl_LinkageError__init_(var_0) {
    var var_1 = new jl_LinkageError();
    jl_LinkageError__init_0(var_1, var_0);
    return var_1;
}
function jl_LinkageError__init_0($this, $message) {
    jl_Error__init_0($this, $message);
}
function jl_IncompatibleClassChangeError() {
    jl_LinkageError.call(this);
}
function jl_IncompatibleClassChangeError__init_(var_0) {
    var var_1 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_0(var_1, var_0);
    return var_1;
}
function jl_IncompatibleClassChangeError__init_0($this, $message) {
    jl_LinkageError__init_0($this, $message);
}
function jl_NoSuchFieldError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchFieldError__init_(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
function ju_LinkedList$Entry() {
    var a = this; jl_Object.call(a);
    a.$item = null;
    a.$next2 = null;
    a.$previous = null;
}
function ju_LinkedList$Entry__init_() {
    var var_0 = new ju_LinkedList$Entry();
    ju_LinkedList$Entry__init_0(var_0);
    return var_0;
}
function ju_LinkedList$Entry__init_0($this) {
    jl_Object__init_0($this);
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_1() {
    jl_Object.call(this);
    this.$_00 = null;
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_1__init_(var_0) {
    var var_1 = new nitsg_SWGame$missile_x_bomb$lambda$_4_1();
    nitsg_SWGame$missile_x_bomb$lambda$_4_1__init_0(var_1, var_0);
    return var_1;
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_1__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_00 = var$1;
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_1_test(var$0, var$1) {
    return nitsg_SWGame$missile_x_bomb$lambda$_4_1_test0(var$0, var$1);
}
function nitsg_SWGame$missile_x_bomb$lambda$_4_1_test0(var$0, var$1) {
    return nitsg_SWGame_lambda$missile_x_bomb$4(var$0.$_00, var$1);
}
function nitsg_SWGame$_move$lambda$_2_0() {
    jl_Object.call(this);
}
function nitsg_SWGame$_move$lambda$_2_0__init_() {
    var var_0 = new nitsg_SWGame$_move$lambda$_2_0();
    nitsg_SWGame$_move$lambda$_2_0__init_0(var_0);
    return var_0;
}
function nitsg_SWGame$_move$lambda$_2_0__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function nitsg_SWGame$_move$lambda$_2_0_test(var$0, var$1) {
    return nitsg_SWGame$_move$lambda$_2_0_test0(var$0, var$1);
}
function nitsg_SWGame$_move$lambda$_2_0_test0(var$0, var$1) {
    return nitsg_SWGame_lambda$_move$0(var$1);
}
function jl_Character() {
    jl_Object.call(this);
}
var jl_Character_TYPE = null;
var jl_Character_characterCache = null;
function jl_Character_$callClinit() {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
}
function jl_Character_forDigit($digit, $radix) {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function jl_Enum() {
    var a = this; jl_Object.call(a);
    a.$name = null;
    a.$ordinal = 0;
}
function jl_Enum__init_(var_0, var_1) {
    var var_2 = new jl_Enum();
    jl_Enum__init_0(var_2, var_0, var_1);
    return var_2;
}
function jl_Enum__init_0($this, $name, $ordinal) {
    jl_Object__init_0($this);
    $this.$name = $name;
    $this.$ordinal = $ordinal;
}
function jl_Enum_toString($this) {
    return $this.$name.$toString();
}
function nitsg_SWGame$Bomb() {
    var a = this; jl_Object.call(a);
    a.$y = 0;
    a.$x = 0;
    a.$this$0 = null;
}
function nitsg_SWGame$Bomb__init_(var_0, var_1, var_2) {
    var var_3 = new nitsg_SWGame$Bomb();
    nitsg_SWGame$Bomb__init_0(var_3, var_0, var_1, var_2);
    return var_3;
}
function nitsg_SWGame$Bomb__init_0($this, var$1, $x, $y) {
    $this.$this$0 = var$1;
    jl_Object__init_0($this);
    $this.$x = $x;
    $this.$y = $y;
}
function nitsg_SWGame$Bomb_move($this) {
    var $h, $vx, $remains, $wx, var$5, var$6, var$7;
    $this.$clear();
    $this.$y = $this.$y + 1 | 0;
    if ($this.$y < $this.$this$0.$Y) {
        $this.$this$0.$disp.$put($this.$x, $this.$y, $rt_s(11));
        return 1;
    }
    if (!$this.$this$0.$bombs_ground.data[$this.$x]) {
        $h = 0;
        $this.$this$0.$bombs_ground.data[$this.$x] = 1;
        $vx = 0;
        while (($vx + 3 | 0) <= $this.$this$0.$X) {
            $remains = 0;
            $wx = 0;
            while ($wx < 3) {
                if (!$this.$this$0.$bombs_ground.data[$vx + $wx | 0])
                    $remains = $remains + 1 | 0;
                $wx = $wx + 1 | 0;
            }
            if ($remains > 0)
                $h = $h + 1 | 0;
            $vx = $vx + 5 | 0;
        }
        if ($h != $this.$this$0.$humans_cnt && $h != ($this.$this$0.$humans_cnt - 1 | 0)) {
            var$5 = $this.$this$0;
            var$6 = $this.$this$0.$humans_cnt;
            var$7 = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$7, $rt_s(12)), var$6), $rt_s(13)), $h);
            nitsg_SWGame_log(var$5, jl_StringBuilder_toString(var$7));
        }
        if ($h != $this.$this$0.$humans_cnt) {
            $this.$this$0.$humans_cnt = $h;
            nitsg_SWGame_msg($this.$this$0, $rt_s(14));
        }
    }
    return 0;
}
function nitsg_SWGame$Bomb_get_pos($this) {
    return $rt_imul($this.$x, $this.$this$0.$Y) + $this.$y | 0;
}
function nitsg_SWGame$Bomb_clear($this) {
    $this.$this$0.$disp.$put($this.$x, $this.$y, $rt_s(15));
}
function otci_IntegerUtil() {
    jl_Object.call(this);
}
function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
    var $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(16);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit($value >>> $pos & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
}
function ju_Map() {
}
function jl_Math() {
    jl_Object.call(this);
}
function jl_Math_min($a, $b) {
    if ($a < $b)
        $b = $a;
    return $b;
}
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
function nitc_TerminalGame$Status() {
    jl_Enum.call(this);
}
var nitc_TerminalGame$Status_CONT = null;
var nitc_TerminalGame$Status_WIN = null;
var nitc_TerminalGame$Status_LOSE = null;
var nitc_TerminalGame$Status_$VALUES = null;
function nitc_TerminalGame$Status_$callClinit() {
    nitc_TerminalGame$Status_$callClinit = $rt_eraseClinit(nitc_TerminalGame$Status);
    nitc_TerminalGame$Status__clinit_();
}
function nitc_TerminalGame$Status__init_(var_0, var_1) {
    var var_2 = new nitc_TerminalGame$Status();
    nitc_TerminalGame$Status__init_0(var_2, var_0, var_1);
    return var_2;
}
function nitc_TerminalGame$Status__init_0($this, var$1, var$2) {
    nitc_TerminalGame$Status_$callClinit();
    jl_Enum__init_0($this, var$1, var$2);
}
function nitc_TerminalGame$Status__clinit_() {
    var var$1, var$2;
    nitc_TerminalGame$Status_CONT = nitc_TerminalGame$Status__init_($rt_s(17), 0);
    nitc_TerminalGame$Status_WIN = nitc_TerminalGame$Status__init_($rt_s(18), 1);
    nitc_TerminalGame$Status_LOSE = nitc_TerminalGame$Status__init_($rt_s(19), 2);
    var$1 = $rt_createArray(nitc_TerminalGame$Status, 3);
    var$2 = var$1.data;
    var$2[0] = nitc_TerminalGame$Status_CONT;
    var$2[1] = nitc_TerminalGame$Status_WIN;
    var$2[2] = nitc_TerminalGame$Status_LOSE;
    nitc_TerminalGame$Status_$VALUES = var$1;
}
function jl_Cloneable() {
}
function otji_JS() {
    jl_Object.call(this);
}
function jl_CharSequence() {
}
function jl_StringIndexOutOfBoundsException() {
    jl_IndexOutOfBoundsException.call(this);
}
function jl_StringIndexOutOfBoundsException__init_() {
    var var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
}
function jl_StringIndexOutOfBoundsException__init_0($this) {
    jl_IndexOutOfBoundsException__init_0($this);
}
function ju_Set() {
}
function ju_AbstractSequentialList() {
    ju_AbstractList.call(this);
}
function ju_AbstractSequentialList__init_() {
    var var_0 = new ju_AbstractSequentialList();
    ju_AbstractSequentialList__init_0(var_0);
    return var_0;
}
function ju_AbstractSequentialList__init_0($this) {
    ju_AbstractList__init_0($this);
}
function ju_AbstractSequentialList_add($this, $index, $element) {
    var $iter;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $iter = $this.$listIterator($index);
    $iter.$add0($element);
}
function ju_AbstractSequentialList_iterator($this) {
    return $this.$listIterator0();
}
function nitc_EventDriver$Key() {
    jl_Enum.call(this);
}
var nitc_EventDriver$Key_Q = null;
var nitc_EventDriver$Key_P = null;
var nitc_EventDriver$Key_ESC = null;
var nitc_EventDriver$Key_LEFT = null;
var nitc_EventDriver$Key_RIGHT = null;
var nitc_EventDriver$Key_SPC = null;
var nitc_EventDriver$Key_$VALUES = null;
function nitc_EventDriver$Key_$callClinit() {
    nitc_EventDriver$Key_$callClinit = $rt_eraseClinit(nitc_EventDriver$Key);
    nitc_EventDriver$Key__clinit_();
}
function nitc_EventDriver$Key__init_(var_0, var_1) {
    var var_2 = new nitc_EventDriver$Key();
    nitc_EventDriver$Key__init_0(var_2, var_0, var_1);
    return var_2;
}
function nitc_EventDriver$Key__init_0($this, var$1, var$2) {
    nitc_EventDriver$Key_$callClinit();
    jl_Enum__init_0($this, var$1, var$2);
}
function nitc_EventDriver$Key__clinit_() {
    var var$1, var$2;
    nitc_EventDriver$Key_Q = nitc_EventDriver$Key__init_($rt_s(20), 0);
    nitc_EventDriver$Key_P = nitc_EventDriver$Key__init_($rt_s(21), 1);
    nitc_EventDriver$Key_ESC = nitc_EventDriver$Key__init_($rt_s(22), 2);
    nitc_EventDriver$Key_LEFT = nitc_EventDriver$Key__init_($rt_s(23), 3);
    nitc_EventDriver$Key_RIGHT = nitc_EventDriver$Key__init_($rt_s(24), 4);
    nitc_EventDriver$Key_SPC = nitc_EventDriver$Key__init_($rt_s(25), 5);
    var$1 = $rt_createArray(nitc_EventDriver$Key, 6);
    var$2 = var$1.data;
    var$2[0] = nitc_EventDriver$Key_Q;
    var$2[1] = nitc_EventDriver$Key_P;
    var$2[2] = nitc_EventDriver$Key_ESC;
    var$2[3] = nitc_EventDriver$Key_LEFT;
    var$2[4] = nitc_EventDriver$Key_RIGHT;
    var$2[5] = nitc_EventDriver$Key_SPC;
    nitc_EventDriver$Key_$VALUES = var$1;
}
function ju_Map$Entry() {
}
function ju_MapEntry() {
    var a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
function ju_MapEntry__init_(var_0, var_1) {
    var var_2 = new ju_MapEntry();
    ju_MapEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_MapEntry__init_0($this, $theKey, $theValue) {
    jl_Object__init_0($this);
    $this.$key = $theKey;
    $this.$value0 = $theValue;
}
function ju_HashMap$HashEntry() {
    var a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next = null;
}
function ju_HashMap$HashEntry__init_(var_0, var_1) {
    var var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_0(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap$HashEntry__init_0($this, $theKey, $hash) {
    ju_MapEntry__init_0($this, $theKey, null);
    $this.$origKeyHash = $hash;
}
function ju_Comparator() {
}
function jl_String$_clinit_$lambda$_81_0() {
    jl_Object.call(this);
}
function jl_String$_clinit_$lambda$_81_0__init_() {
    var var_0 = new jl_String$_clinit_$lambda$_81_0();
    jl_String$_clinit_$lambda$_81_0__init_0(var_0);
    return var_0;
}
function jl_String$_clinit_$lambda$_81_0__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length = 0;
}
function jl_AbstractStringBuilder__init_() {
    var var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
}
function jl_AbstractStringBuilder__init_1(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_2(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_2($this, 16);
}
function jl_AbstractStringBuilder__init_2($this, $capacity) {
    jl_Object__init_0($this);
    $this.$buffer = $rt_createCharArray($capacity);
}
function jl_AbstractStringBuilder_append($this, $string) {
    return $this.$insert($this.$length, $string);
}
function jl_AbstractStringBuilder_insert($this, $index, $string) {
    var $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length) {
        if ($string === null)
            $string = $rt_s(26);
        else if ($string.$isEmpty())
            return $this;
        $this.$ensureCapacity($this.$length + $string.$length0() | 0);
        $i = $this.$length - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + $string.$length0() | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length = $this.$length + $string.$length0() | 0;
        $i = 0;
        while ($i < $string.$length0()) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = $string.$charAt($i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_AbstractStringBuilder_append0($this, $value) {
    return $this.$append2($value, 10);
}
function jl_AbstractStringBuilder_append1($this, $value, $radix) {
    return $this.$insert0($this.$length, $value, $radix);
}
function jl_AbstractStringBuilder_insert0($this, $target, $value, $radix) {
    var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value;
    }
    a: {
        if ($value < $radix) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = 2147483647 / $radix | 0;
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if (var$10 > $value) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (var$10 > $posLimit)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (var$10 <= 0)
                    break a;
                var$5 = $this.$buffer.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($value / var$10 | 0, $radix);
                $value = $value % var$10 | 0;
                var$10 = var$10 / $radix | 0;
                var$11 = var$6;
            }
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_append2($this, $obj) {
    return $this.$insert1($this.$length, $obj);
}
function jl_AbstractStringBuilder_insert1($this, $index, $obj) {
    return $this.$insert($index, $obj === null ? $rt_s(26) : $obj.$toString());
}
function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
    var $newLength, var$3;
    if ($this.$buffer.data.length >= $capacity)
        return;
    if ($this.$buffer.data.length >= 1073741823)
        $newLength = 2147483647;
    else {
        var$3 = $this.$buffer.data.length * 2 | 0;
        $newLength = jl_Math_max($capacity, jl_Math_max(var$3, 5));
    }
    $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
}
function jl_AbstractStringBuilder_toString($this) {
    return jl_String__init_0($this.$buffer, 0, $this.$length);
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var $sz, $i;
    $sz = $this.$length - $start | 0;
    $this.$ensureCapacity(($this.$length + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length = $this.$length + ($end - $start | 0) | 0;
}
function jl_Appendable() {
}
function jl_StringBuilder() {
    jl_AbstractStringBuilder.call(this);
}
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_0($this);
}
function jl_StringBuilder_append1($this, $string) {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
}
function jl_StringBuilder_append0($this, $value) {
    jl_AbstractStringBuilder_append0($this, $value);
    return $this;
}
function jl_StringBuilder_append($this, $obj) {
    jl_AbstractStringBuilder_append2($this, $obj);
    return $this;
}
function jl_StringBuilder_insert($this, $index, $obj) {
    jl_AbstractStringBuilder_insert1($this, $index, $obj);
    return $this;
}
function jl_StringBuilder_insert0($this, $index, $string) {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
}
function jl_StringBuilder_toString($this) {
    return jl_AbstractStringBuilder_toString($this);
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuilder_insert1($this, var$1, var$2) {
    return $this.$insert2(var$1, var$2);
}
function jl_StringBuilder_insert2($this, var$1, var$2) {
    return $this.$insert3(var$1, var$2);
}
function ju_Queue() {
}
function nitc_DisplayDriver() {
}
function nitj_JSApp$JSCanvas() {
    jl_Object.call(this);
}
function nitj_JSApp$JSCanvas__init_() {
    var var_0 = new nitj_JSApp$JSCanvas();
    nitj_JSApp$JSCanvas__init_0(var_0);
    return var_0;
}
function nitj_JSApp$JSCanvas__init_0($this) {
    jl_Object__init_0($this);
}
function nitj_JSApp$JSCanvas_getWidth($this) {
    return Canvas.getWidth();
}
function nitj_JSApp$JSCanvas_getHeight($this) {
    return Canvas.getHeight();
}
function nitj_JSApp$JSCanvas_put($this, $x, $y, $text) {
    Canvas.put($x, $y, $rt_ustr($text));
}
function nitj_JSApp$JSCanvas_msg($this, $text) {
    var var$2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(27)), $text);
    console.log($rt_ustr(jl_StringBuilder_toString(var$2)));
    starwars_msg($rt_ustr($text));
}
function nitj_JSApp$JSCanvas_log($this, $text) {
    console.log($rt_ustr($text));
}
function nitj_JSApp$JSCanvas_flush($this) {
    return;
}
function ju_ConcurrentModificationException() {
    jl_RuntimeException.call(this);
}
function ju_ConcurrentModificationException__init_() {
    var var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_0(var_0);
    return var_0;
}
function ju_ConcurrentModificationException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jlr_AnnotatedElement() {
}
function ju_AbstractSet() {
    ju_AbstractCollection.call(this);
}
function ju_AbstractSet__init_() {
    var var_0 = new ju_AbstractSet();
    ju_AbstractSet__init_0(var_0);
    return var_0;
}
function ju_AbstractSet__init_0($this) {
    ju_AbstractCollection__init_0($this);
}
function ju_HashMap$1() {
    ju_AbstractSet.call(this);
    this.$this$00 = null;
}
function ju_HashMap$1__init_(var_0) {
    var var_1 = new ju_HashMap$1();
    ju_HashMap$1__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$1__init_0($this, $this$0) {
    $this.$this$00 = $this$0;
    ju_AbstractSet__init_0($this);
}
function ju_HashMap$1_iterator($this) {
    return ju_HashMap$KeyIterator__init_($this.$this$00);
}
function ju_HashMap$KeyIterator() {
    ju_HashMap$AbstractMapIterator.call(this);
}
function ju_HashMap$KeyIterator__init_(var_0) {
    var var_1 = new ju_HashMap$KeyIterator();
    ju_HashMap$KeyIterator__init_0(var_1, var_0);
    return var_1;
}
function ju_HashMap$KeyIterator__init_0($this, $map) {
    ju_HashMap$AbstractMapIterator__init_0($this, $map);
}
function ju_HashMap$KeyIterator_next($this) {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry.$key;
}
function nitc_Utils() {
    jl_Object.call(this);
}
function nitc_Utils_repeat($str, $n) {
    var $res, $ii;
    $res = jl_StringBuilder__init_();
    $ii = 0;
    while ($ii < $n) {
        $res.$append($str);
        $ii = $ii + 1 | 0;
    }
    return $res.$toString();
}
function nitc_Utils_removeIf($collection, $filter) {
    var $n, $i, $e;
    $n = 0;
    $i = $collection.$iterator();
    while ($i.$hasNext()) {
        $e = $i.$next0();
        if ($filter.$test1($e)) {
            $n = $n + 1 | 0;
            $i.$remove();
        }
    }
    return $n <= 0 ? 0 : 1;
}
function ju_AbstractMap() {
    jl_Object.call(this);
    this.$cachedKeySet = null;
}
function ju_AbstractMap__init_() {
    var var_0 = new ju_AbstractMap();
    ju_AbstractMap__init_0(var_0);
    return var_0;
}
function ju_AbstractMap__init_0($this) {
    jl_Object__init_0($this);
}
function ju_HashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount = 0;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
function ju_HashMap__init_() {
    var var_0 = new ju_HashMap();
    ju_HashMap__init_0(var_0);
    return var_0;
}
function ju_HashMap__init_1(var_0) {
    var var_1 = new ju_HashMap();
    ju_HashMap__init_2(var_1, var_0);
    return var_1;
}
function ju_HashMap__init_3(var_0, var_1) {
    var var_2 = new ju_HashMap();
    ju_HashMap__init_4(var_2, var_0, var_1);
    return var_2;
}
function ju_HashMap_newElementArray($this, $s) {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
}
function ju_HashMap__init_0($this) {
    ju_HashMap__init_2($this, 16);
}
function ju_HashMap__init_2($this, $capacity) {
    ju_HashMap__init_4($this, $capacity, 0.75);
}
function ju_HashMap_calculateCapacity($x) {
    var var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
}
function ju_HashMap__init_4($this, $capacity, $loadFactor) {
    var var$3;
    ju_AbstractMap__init_0($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray(var$3);
        $this.$loadFactor = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
}
function ju_HashMap_computeThreshold($this) {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
}
function ju_HashMap_containsKey($this, $key) {
    var $m;
    $m = ju_HashMap_getEntry($this, $key);
    return $m === null ? 0 : 1;
}
function ju_HashMap_getEntry($this, $key) {
    var $m, $hash, $index;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = ju_HashMap_computeHashCode($key);
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    return $m;
}
function ju_HashMap_findNonNullKeyEntry($this, $key, $index, $keyHash) {
    var $m, var$5;
    $m = $this.$elementData.data[$index];
    while ($m !== null) {
        if ($m.$origKeyHash == $keyHash) {
            var$5 = $m.$key;
            if (ju_HashMap_areEqualKeys($key, var$5))
                break;
        }
        $m = $m.$next;
    }
    return $m;
}
function ju_HashMap_findNullKeyEntry($this) {
    var $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next;
    }
    return $m;
}
function ju_HashMap_keySet($this) {
    if ($this.$cachedKeySet === null)
        $this.$cachedKeySet = ju_HashMap$1__init_($this);
    return $this.$cachedKeySet;
}
function ju_HashMap_put($this, $key, $value) {
    return $this.$putImpl($key, $value);
}
function ju_HashMap_putImpl($this, $key, $value) {
    var $entry, var$4, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount = $this.$modCount + 1 | 0;
            $entry = $this.$createHashedEntry(null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    } else {
        $hash = ju_HashMap_computeHashCode($key);
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount = $this.$modCount + 1 | 0;
            $entry = $this.$createHashedEntry($key, $index, $hash);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    }
    $result = $entry.$value0;
    $entry.$value0 = $value;
    return $result;
}
function ju_HashMap_createHashedEntry($this, $key, $index, $hash) {
    var $entry;
    $entry = ju_HashMap$HashEntry__init_($key, $hash);
    $entry.$next = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
}
function ju_HashMap_rehash($this, $capacity) {
    var $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next;
            $entry.$next = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
}
function ju_HashMap_rehash0($this) {
    $this.$rehash0($this.$elementData.data.length);
}
function ju_HashMap_computeHashCode($key) {
    return $key.$hashCode();
}
function ju_HashMap_areEqualKeys($key1, $key2) {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
}
function nitsg_SWGame() {
    var a = this; jl_Object.call(a);
    a.$disp = null;
    a.$X = 0;
    a.$Y = 0;
    a.$ship_max_v = 3;
    a.$ship_img = $rt_s(28);
    a.$mars_img = null;
    a.$mars_strip = 5;
    a.$mars_num = 5;
    a.$mars_total = 120;
    a.$ship_h = 4;
    a.$bomb_freq = 0.02;
    a.$humans_width = 3;
    a.$humans_period = 5;
    a.$rand = null;
    a.$timer = 0;
    a.$ship_x = 0;
    a.$ship_v = 0;
    a.$mars_a = null;
    a.$bombs = null;
    a.$missiles = null;
    a.$bombs_ground = null;
    a.$humans_cnt = 0;
    a.$mars_reserve = 0;
}
function nitsg_SWGame__init_() {
    var var_0 = new nitsg_SWGame();
    nitsg_SWGame__init_0(var_0);
    return var_0;
}
function nitsg_SWGame__init_0($this) {
    var var$1, var$2;
    jl_Object__init_0($this);
    $this.$ship_max_v = 3;
    $this.$ship_img = $rt_s(28);
    var$1 = $rt_createArray(jl_String, 2);
    var$2 = var$1.data;
    var$2[0] = $rt_s(29);
    var$2[1] = $rt_s(30);
    $this.$mars_img = var$1;
    $this.$mars_strip = 5;
    $this.$mars_num = 5;
    $this.$mars_total = 120;
    $this.$ship_h = 4;
    $this.$bomb_freq = 0.02;
    $this.$humans_width = 3;
    $this.$humans_period = 5;
    $this.$rand = ju_Random__init_();
    $this.$mars_a = $rt_createArray(nitsg_SWGame$Mars, 5);
    $this.$bombs = ju_LinkedList__init_();
    $this.$missiles = ju_LinkedList__init_();
}
function nitsg_SWGame_move($this, $key) {
    var var$2, var$3;
    a: {
        $this.$timer = $this.$timer + 1 | 0;
        if ($key !== null) {
            if ($this.$ship_v < 3) {
                nitc_EventDriver$Key_$callClinit();
                if ($key === nitc_EventDriver$Key_RIGHT) {
                    $this.$ship_v = $this.$ship_v + 1 | 0;
                    var$2 = $this.$ship_v;
                    var$3 = jl_StringBuilder__init_();
                    jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(31)), var$2);
                    nitsg_SWGame_msg($this, jl_StringBuilder_toString(var$3));
                    break a;
                }
            }
            if ($this.$ship_v > (-3)) {
                nitc_EventDriver$Key_$callClinit();
                if ($key === nitc_EventDriver$Key_LEFT) {
                    $this.$ship_v = $this.$ship_v - 1 | 0;
                    var$2 = $this.$ship_v;
                    var$3 = jl_StringBuilder__init_();
                    jl_StringBuilder_append0(jl_StringBuilder_append(var$3, $rt_s(31)), var$2);
                    nitsg_SWGame_msg($this, jl_StringBuilder_toString(var$3));
                    break a;
                }
            }
            nitc_EventDriver$Key_$callClinit();
            if ($key === nitc_EventDriver$Key_SPC)
                $this.$missiles.$add1(nitsg_SWGame$Missile__init_($this, $this.$ship_x, $this.$Y - 4 | 0, $this.$ship_v / 4.0));
        }
    }
    nitsg_SWGame__move($this);
    if (!$this.$humans_cnt) {
        nitc_TerminalGame$Status_$callClinit();
        return nitc_TerminalGame$Status_LOSE;
    }
    if (!$this.$mars_reserve && !nitsg_SWGame_mars_active($this)) {
        nitc_TerminalGame$Status_$callClinit();
        return nitc_TerminalGame$Status_WIN;
    }
    nitc_TerminalGame$Status_$callClinit();
    return nitc_TerminalGame$Status_CONT;
}
function nitsg_SWGame__move($this) {
    var $L0, $L1, $ii;
    $L0 = $rt_s(28).$length0() / 2 | 0;
    $L1 = (($this.$X - 1 | 0) - $rt_s(28).$length0() | 0) + $L0 | 0;
    nitsg_SWGame_draw_ship($this, 1);
    $this.$ship_x = $this.$ship_x + $this.$ship_v | 0;
    if ($this.$ship_x < $L0) {
        $this.$ship_x = (2 * $L0 | 0) - $this.$ship_x | 0;
        $this.$ship_v = $this.$ship_v * (-1) | 0;
    } else if ($this.$ship_x > $L1) {
        $this.$ship_x = (2 * $L1 | 0) - $this.$ship_x | 0;
        $this.$ship_v = $this.$ship_v * (-1) | 0;
    }
    nitsg_SWGame_draw_ship($this, 0);
    $ii = 0;
    while ($ii < $this.$mars_a.data.length) {
        if ($this.$mars_a.data[$ii] !== null) {
            if (!$this.$mars_a.data[$ii].$move1()) {
                $this.$mars_a.data[$ii] = null;
                $this.$mars_reserve = $this.$mars_reserve + 1 | 0;
            }
        } else if ($this.$timer > 20 && $this.$mars_reserve > 0) {
            $this.$mars_a.data[$ii] = nitsg_SWGame$Mars__init_($this);
            $this.$mars_reserve = $this.$mars_reserve - 1 | 0;
        }
        $ii = $ii + 1 | 0;
    }
    nitc_Utils_removeIf($this.$bombs, nitsg_SWGame$_move$lambda$_2_0__init_());
    nitsg_SWGame_missile_x_bomb($this);
    nitc_Utils_removeIf($this.$missiles, nitsg_SWGame$_move$lambda$_2_1__init_());
    nitsg_SWGame_missile_x_bomb($this);
    nitsg_SWGame_missile_x_mars($this);
    $this.$disp.$flush();
}
function nitsg_SWGame_missile_x_mars($this) {
    nitc_Utils_removeIf($this.$missiles, nitsg_SWGame$missile_x_mars$lambda$_3_0__init_($this));
}
function nitsg_SWGame_missile_x_bomb($this) {
    var $c_bombs, var$2, $bomb, $c_missiles, $missile;
    $c_bombs = ju_HashSet__init_();
    var$2 = $this.$bombs.$iterator();
    while (var$2.$hasNext()) {
        $bomb = var$2.$next0();
        $c_bombs.$add1(jl_Integer_valueOf($bomb.$get_pos()));
    }
    $c_missiles = ju_HashSet__init_();
    var$2 = $this.$missiles.$iterator();
    while (var$2.$hasNext()) {
        $missile = var$2.$next0();
        $c_missiles.$add1(jl_Integer_valueOf($missile.$get_pos()));
    }
    $c_missiles.$retainAll($c_bombs);
    nitc_Utils_removeIf($this.$bombs, nitsg_SWGame$missile_x_bomb$lambda$_4_0__init_($c_missiles));
    nitc_Utils_removeIf($this.$missiles, nitsg_SWGame$missile_x_bomb$lambda$_4_1__init_($c_missiles));
}
function nitsg_SWGame_draw_ship($this, $erase) {
    var $L;
    $L = $rt_s(28).$length0();
    $this.$disp.$put($this.$ship_x - ($L / 2 | 0) | 0, $this.$Y - 4 | 0, !$erase ? $rt_s(28) : nitc_Utils_repeat($rt_s(15), $L));
}
function nitsg_SWGame_put_smart($this, $x, $y, $text) {
    var $L;
    $L = $text.$length0();
    if ($x < 0)
        $this.$disp.$put(0, $y, $text.$substring( -$x));
    else if (($x + $L | 0) <= $this.$X)
        $this.$disp.$put($x, $y, $text);
    else
        $this.$disp.$put($x, $y, $text.$substring0(0, $this.$X - $x | 0));
}
function nitsg_SWGame_init($this, $displayDriver, $seed) {
    var var$3, var$4, var$5, $x, $y, $ii;
    $this.$disp = $displayDriver;
    $this.$X = $this.$disp.$getWidth();
    $this.$Y = $this.$disp.$getHeight();
    var$3 = $this.$X;
    var$4 = $this.$Y;
    var$5 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$5, $rt_s(32)), var$3), $rt_s(33)), var$4);
    nitsg_SWGame_log($this, jl_StringBuilder_toString(var$5));
    $this.$bombs_ground = $rt_createBooleanArray($this.$X);
    if (Long_ne($seed, Long_ZERO))
        $this.$rand.$setSeed($seed);
    $x = 0;
    $y = $this.$Y - 3 | 0;
    $this.$humans_cnt = 0;
    while (($x + 3 | 0) <= $this.$X) {
        $this.$disp.$put($x, $y, $rt_s(34));
        $this.$disp.$put($x + 1 | 0, $y + 1 | 0, $rt_s(35));
        $this.$disp.$put($x, $y + 2 | 0, $rt_s(36));
        $x = $x + 5 | 0;
        $this.$humans_cnt = $this.$humans_cnt + 1 | 0;
        $this.$disp.$flush();
    }
    $this.$ship_x = $this.$X / 2 | 0;
    $this.$ship_v = 0;
    nitsg_SWGame_draw_ship($this, 0);
    $this.$timer = 0;
    $ii = 0;
    while ($ii < 5) {
        $this.$mars_a.data[$ii] = null;
        $ii = $ii + 1 | 0;
    }
    $this.$mars_reserve = 120;
    $this.$bombs.$clear();
    $this.$missiles.$clear();
    $this.$disp.$flush();
    nitsg_SWGame_msg($this, $rt_s(37));
}
function nitsg_SWGame_log($this, $message) {
    $this.$disp.$log($message);
}
function nitsg_SWGame_mars_active($this) {
    var $n, $ii;
    $n = 0;
    $ii = 0;
    while ($ii < 5) {
        if ($this.$mars_a.data[$ii] !== null)
            $n = $n + 1 | 0;
        $ii = $ii + 1 | 0;
    }
    return $n;
}
function nitsg_SWGame_msg($this, $message) {
    var var$2, var$3, var$4, $statusLine, $L, var$7, var$8;
    var$2 = nitsg_SWGame_mars_active($this) + $this.$mars_reserve | 0;
    var$3 = $this.$humans_cnt;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$4, $rt_s(38)), var$2), $rt_s(39)), var$3);
    $statusLine = jl_StringBuilder_toString(var$4);
    $L = $this.$X - $statusLine.$length0() | 0;
    if ($message.$length0() > $L) {
        var$4 = $message.$substring0(0, $L - 3 | 0);
        var$7 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$7, var$4), $rt_s(40));
        $message = jl_StringBuilder_toString(var$7);
    }
    var$7 = $this.$disp;
    var$4 = nitc_Utils_repeat($rt_s(15), $L - $message.$length0() | 0);
    var$8 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$8, $message), var$4), $statusLine);
    var$7.$msg(jl_StringBuilder_toString(var$8));
}
function nitsg_SWGame_lambda$missile_x_bomb$4($c_missiles, $missile) {
    var $rem;
    $rem = $c_missiles.$contains(jl_Integer_valueOf($missile.$get_pos()));
    if ($rem)
        $missile.$clear();
    return $rem;
}
function nitsg_SWGame_lambda$missile_x_bomb$3($c_missiles, $bomb) {
    var $rem;
    $rem = $c_missiles.$contains(jl_Integer_valueOf($bomb.$get_pos()));
    if ($rem)
        $bomb.$clear();
    return $rem;
}
function nitsg_SWGame_lambda$missile_x_mars$2($this, $missile) {
    var $ii, var$3, var$4, var$5;
    if ($missile.$y0 >= 5)
        return 0;
    $ii = 0;
    while ($ii < $this.$mars_a.data.length) {
        if ($this.$mars_a.data[$ii] !== null && $this.$mars_a.data[$ii].$y1 == $missile.$y0 && ($missile.$x0 | 0) >= $this.$mars_a.data[$ii].$x1) {
            var$3 = $missile.$x0 | 0;
            var$4 = $this.$mars_a.data[$ii].$x1;
            var$5 = $this.$mars_img.data[0];
            if (var$3 < (var$4 + var$5.$length0() | 0)) {
                $this.$mars_a.data[$ii].$clear();
                $this.$mars_a.data[$ii] = null;
                nitsg_SWGame_msg($this, $rt_s(41));
                return 1;
            }
        }
        $ii = $ii + 1 | 0;
    }
    return 0;
}
function nitsg_SWGame_lambda$_move$1($missile) {
    return $missile.$move1() ? 0 : 1;
}
function nitsg_SWGame_lambda$_move$0($bomb) {
    return $bomb.$move1() ? 0 : 1;
}
function nitsg_SWGame$Mars() {
    var a = this; jl_Object.call(a);
    a.$t = 0;
    a.$x1 = 0;
    a.$v = 0;
    a.$tx = 0;
    a.$y1 = 0;
    a.$this$01 = null;
}
function nitsg_SWGame$Mars__init_(var_0) {
    var var_1 = new nitsg_SWGame$Mars();
    nitsg_SWGame$Mars__init_0(var_1, var_0);
    return var_1;
}
function nitsg_SWGame$Mars__init_0($this, var$1) {
    $this.$this$01 = var$1;
    jl_Object__init_0($this);
    $this.$t = 0;
    if (var$1.$rand.$nextBoolean()) {
        $this.$x1 = 0;
        $this.$v = 1;
    } else {
        $this.$x1 = (var$1.$X - 1 | 0) - var$1.$mars_img.data.length | 0;
        $this.$v = (-1);
    }
    $this.$tx = 10 + var$1.$rand.$nextInt0(10) | 0;
    $this.$y1 = var$1.$rand.$nextInt0(5);
}
function nitsg_SWGame$Mars_move($this) {
    var $L;
    $L = $this.$this$01.$mars_img.data[0].$length0();
    $this.$clear();
    $this.$x1 = $this.$x1 + $this.$v | 0;
    $this.$t = $this.$t + 1 | 0;
    if ($this.$x1 < $this.$this$01.$X && $this.$x1 >  -$L) {
        if ($this.$t >= $this.$tx) {
            $this.$tx = ($this.$t + 10 | 0) + $this.$this$01.$rand.$nextInt0(10) | 0;
            $this.$v = !$this.$this$01.$rand.$nextBoolean() ? (-1) : 1;
        }
        nitsg_SWGame_put_smart($this.$this$01, $this.$x1, $this.$y1, $this.$this$01.$mars_img.data[$this.$t % $this.$this$01.$mars_img.data.length | 0]);
        $this.$this$01.$disp.$flush();
        if ($this.$this$01.$rand.$nextDouble() < 0.02)
            $this.$drop_bomb();
        return 1;
    }
    return 0;
}
function nitsg_SWGame$Mars_clear($this) {
    var $L;
    $L = $this.$this$01.$mars_img.data[0].$length0();
    nitsg_SWGame_put_smart($this.$this$01, $this.$x1, $this.$y1, nitc_Utils_repeat($rt_s(15), $L));
}
function nitsg_SWGame$Mars_drop_bomb($this) {
    var $bx;
    $bx = $this.$x1 + ($this.$this$01.$mars_img.data[0].$length0() / 2 | 0) | 0;
    if ($bx >= 0 && $bx < ($this.$this$01.$X - 1 | 0))
        $this.$this$01.$bombs.$add1(nitsg_SWGame$Bomb__init_($this.$this$01, $bx, $this.$y1));
}
function ju_Deque() {
}
function nitsg_SWGame$missile_x_mars$lambda$_3_0() {
    jl_Object.call(this);
    this.$_01 = null;
}
function nitsg_SWGame$missile_x_mars$lambda$_3_0__init_(var_0) {
    var var_1 = new nitsg_SWGame$missile_x_mars$lambda$_3_0();
    nitsg_SWGame$missile_x_mars$lambda$_3_0__init_0(var_1, var_0);
    return var_1;
}
function nitsg_SWGame$missile_x_mars$lambda$_3_0__init_0(var$0, var$1) {
    jl_Object__init_0(var$0);
    var$0.$_01 = var$1;
}
function nitsg_SWGame$missile_x_mars$lambda$_3_0_test(var$0, var$1) {
    return nitsg_SWGame$missile_x_mars$lambda$_3_0_test0(var$0, var$1);
}
function nitsg_SWGame$missile_x_mars$lambda$_3_0_test0(var$0, var$1) {
    return nitsg_SWGame_lambda$missile_x_mars$2(var$0.$_01, var$1);
}
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
function ju_HashSet__init_() {
    var var_0 = new ju_HashSet();
    ju_HashSet__init_0(var_0);
    return var_0;
}
function ju_HashSet__init_1(var_0) {
    var var_1 = new ju_HashSet();
    ju_HashSet__init_2(var_1, var_0);
    return var_1;
}
function ju_HashSet__init_0($this) {
    ju_HashSet__init_2($this, ju_HashMap__init_());
}
function ju_HashSet__init_2($this, $backingMap) {
    ju_AbstractSet__init_0($this);
    $this.$backingMap = $backingMap;
}
function ju_HashSet_add($this, $object) {
    return $this.$backingMap.$put0($object, $this) !== null ? 0 : 1;
}
function ju_HashSet_contains($this, $object) {
    return $this.$backingMap.$containsKey($object);
}
function ju_HashSet_iterator($this) {
    return $this.$backingMap.$keySet().$iterator();
}
function ju_LinkedList$SequentialListIterator() {
    var a = this; jl_Object.call(a);
    a.$nextEntry = null;
    a.$prevEntry0 = null;
    a.$currentEntry0 = null;
    a.$index = 0;
    a.$version = 0;
    a.$this$02 = null;
}
function ju_LinkedList$SequentialListIterator__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new ju_LinkedList$SequentialListIterator();
    ju_LinkedList$SequentialListIterator__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function ju_LinkedList$SequentialListIterator__init_0($this, var$1, $nextEntry, $prevEntry, $index) {
    $this.$this$02 = var$1;
    jl_Object__init_0($this);
    $this.$version = $this.$this$02.$modCount0;
    $this.$nextEntry = $nextEntry;
    $this.$prevEntry0 = $prevEntry;
    $this.$index = $index;
}
function ju_LinkedList$SequentialListIterator_hasNext($this) {
    return $this.$nextEntry === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_next($this) {
    var $result;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    if ($this.$nextEntry === null)
        $rt_throw(ju_NoSuchElementException__init_());
    $result = $this.$nextEntry.$item;
    $this.$currentEntry0 = $this.$nextEntry;
    $this.$prevEntry0 = $this.$nextEntry;
    $this.$nextEntry = $this.$nextEntry.$next2;
    $this.$index = $this.$index + 1 | 0;
    return $result;
}
function ju_LinkedList$SequentialListIterator_remove($this) {
    if ($this.$currentEntry0 === null)
        $rt_throw(jl_IllegalStateException__init_());
    ju_LinkedList_access$100($this.$this$02, $this.$currentEntry0);
    if ($this.$currentEntry0 === $this.$prevEntry0) {
        $this.$prevEntry0 = !$this.$hasNext() ? null : $this.$nextEntry.$previous;
        $this.$index = $this.$index - 1 | 0;
    } else if ($this.$currentEntry0 === $this.$nextEntry)
        $this.$nextEntry = !$this.$hasPrevious() ? null : $this.$prevEntry0.$next2;
    $this.$version = $this.$this$02.$modCount0;
    $this.$currentEntry0 = null;
}
function ju_LinkedList$SequentialListIterator_hasPrevious($this) {
    return $this.$prevEntry0 === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_add($this, $e) {
    var $newEntry, var$3;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    $newEntry = ju_LinkedList$Entry__init_();
    $newEntry.$item = $e;
    $newEntry.$previous = $this.$prevEntry0;
    $newEntry.$next2 = $this.$nextEntry;
    if ($this.$prevEntry0 === null)
        ju_LinkedList_access$202($this.$this$02, $newEntry);
    else
        $this.$prevEntry0.$next2 = $newEntry;
    if ($this.$nextEntry === null)
        ju_LinkedList_access$302($this.$this$02, $newEntry);
    else
        $this.$nextEntry.$previous = $newEntry;
    $this.$prevEntry0 = $newEntry;
    ju_LinkedList_access$404($this.$this$02);
    var$3 = $this.$this$02;
    var$3.$modCount0 = var$3.$modCount0 + 1 | 0;
    $this.$version = $this.$this$02.$modCount0;
    $this.$currentEntry0 = null;
}
function ju_LinkedList$SequentialListIterator_checkConcurrentModification($this) {
    if ($this.$version >= $this.$this$02.$modCount0)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
}
function otp_Platform() {
    jl_Object.call(this);
}
function otp_Platform_getName($cls) {
    return $rt_str($cls.$meta.name);
}
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode0 = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String_$callClinit() {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
}
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
}
function jl_String__init_0(var_0, var_1, var_2) {
    var var_3 = new jl_String();
    jl_String__init_2(var_3, var_0, var_1, var_2);
    return var_3;
}
function jl_String__init_1($this, $characters) {
    var var$2, var$3, $i;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_0($this);
    var$3 = var$2.length;
    $this.$characters = $rt_createCharArray(var$3);
    $i = 0;
    while ($i < var$3) {
        $this.$characters.data[$i] = var$2[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String__init_2($this, $value, $offset, $count) {
    var $i, var$5;
    jl_String_$callClinit();
    jl_Object__init_0($this);
    $this.$characters = $rt_createCharArray($count);
    $i = 0;
    while ($i < $count) {
        var$5 = $value.data;
        $this.$characters.data[$i] = var$5[$i + $offset | 0];
        $i = $i + 1 | 0;
    }
}
function jl_String_charAt($this, $index) {
    if ($index >= 0 && $index < $this.$characters.data.length)
        return $this.$characters.data[$index];
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_isEmpty($this) {
    return $this.$characters.data.length ? 0 : 1;
}
function jl_String_substring($this, $beginIndex, $endIndex) {
    if ($beginIndex > $endIndex)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    return jl_String__init_0($this.$characters, $beginIndex, $endIndex - $beginIndex | 0);
}
function jl_String_substring0($this, $beginIndex) {
    return $this.$substring0($beginIndex, $this.$length0());
}
function jl_String_toString($this) {
    return $this;
}
function jl_String_equals($this, $other) {
    var $str, $i;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    if ($str.$length0() != $this.$length0())
        return 0;
    $i = 0;
    while ($i < $str.$length0()) {
        if ($this.$charAt($i) != $str.$charAt($i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    a: {
        if (!$this.$hashCode0) {
            var$1 = $this.$characters.data;
            var$2 = var$1.length;
            var$3 = 0;
            while (true) {
                if (var$3 >= var$2)
                    break a;
                $c = var$1[var$3];
                $this.$hashCode0 = (31 * $this.$hashCode0 | 0) + $c | 0;
                var$3 = var$3 + 1 | 0;
            }
        }
    }
    return $this.$hashCode0;
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_81_0__init_();
}
function jl_NoClassDefFoundError() {
    jl_LinkageError.call(this);
}
function ju_LinkedList() {
    var a = this; ju_AbstractSequentialList.call(a);
    a.$firstEntry = null;
    a.$lastEntry = null;
    a.$size0 = 0;
}
function ju_LinkedList__init_() {
    var var_0 = new ju_LinkedList();
    ju_LinkedList__init_0(var_0);
    return var_0;
}
function ju_LinkedList__init_0($this) {
    ju_AbstractSequentialList__init_0($this);
}
function ju_LinkedList_size($this) {
    return $this.$size0;
}
function ju_LinkedList_clear($this) {
    $this.$firstEntry = null;
    $this.$lastEntry = null;
    $this.$size0 = 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
}
function ju_LinkedList_listIterator($this) {
    return ju_LinkedList$SequentialListIterator__init_($this, $this.$firstEntry, null, 0);
}
function ju_LinkedList_listIterator0($this, $index) {
    var $next, $i, $prev;
    if ($index < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($index <= ($this.$size0 / 2 | 0)) {
        $next = $this.$firstEntry;
        $i = 0;
        while ($i < $index) {
            $next = $next.$next2;
            $i = $i + 1 | 0;
        }
        return ju_LinkedList$SequentialListIterator__init_($this, $next, $next === null ? null : $next.$previous, $index);
    }
    if ($index > $this.$size0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $prev = $this.$lastEntry;
    $i = $index;
    while ($i < $this.$size0) {
        $prev = $prev.$previous;
        $i = $i + 1 | 0;
    }
    return ju_LinkedList$SequentialListIterator__init_($this, $prev === null ? null : $prev.$next2, $prev, $index);
}
function ju_LinkedList_removeEntry($this, $entry) {
    if ($entry.$previous === null)
        $this.$firstEntry = $entry.$next2;
    else
        $entry.$previous.$next2 = $entry.$next2;
    if ($entry.$next2 === null)
        $this.$lastEntry = $entry.$previous;
    else
        $entry.$next2.$previous = $entry.$previous;
    $this.$size0 = $this.$size0 - 1 | 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
}
function ju_LinkedList_access$100($x0, $x1) {
    ju_LinkedList_removeEntry($x0, $x1);
}
function ju_LinkedList_access$202($x0, $x1) {
    $x0.$firstEntry = $x1;
    return $x1;
}
function ju_LinkedList_access$302($x0, $x1) {
    $x0.$lastEntry = $x1;
    return $x1;
}
function ju_LinkedList_access$404($x0) {
    var var$2;
    var$2 = $x0.$size0 + 1 | 0;
    $x0.$size0 = var$2;
    return var$2;
}
function ju_NoSuchElementException() {
    jl_RuntimeException.call(this);
}
function ju_NoSuchElementException__init_() {
    var var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_0(var_0);
    return var_0;
}
function ju_NoSuchElementException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function jl_NoSuchMethodError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
function nitsa_SWJSApp() {
    jl_Object.call(this);
}
function nitsa_SWJSApp_$callClinit() {
    nitsa_SWJSApp_$callClinit = $rt_eraseClinit(nitsa_SWJSApp);
    nitsa_SWJSApp__clinit_();
}
function nitsa_SWJSApp_main($args) {
    nitsa_SWJSApp_$callClinit();
    nitj_JSApp_dispatch($args);
}
function nitsa_SWJSApp__clinit_() {
    nitj_JSApp_game = nitsg_SWGame__init_();
}
function nitsg_SWGame$_move$lambda$_2_1() {
    jl_Object.call(this);
}
function nitsg_SWGame$_move$lambda$_2_1__init_() {
    var var_0 = new nitsg_SWGame$_move$lambda$_2_1();
    nitsg_SWGame$_move$lambda$_2_1__init_0(var_0);
    return var_0;
}
function nitsg_SWGame$_move$lambda$_2_1__init_0(var$0) {
    jl_Object__init_0(var$0);
}
function nitsg_SWGame$_move$lambda$_2_1_test(var$0, var$1) {
    return nitsg_SWGame$_move$lambda$_2_1_test0(var$0, var$1);
}
function nitsg_SWGame$_move$lambda$_2_1_test0(var$0, var$1) {
    return nitsg_SWGame_lambda$_move$1(var$1);
}
function jl_IllegalArgumentException() {
    jl_RuntimeException.call(this);
}
function jl_IllegalArgumentException__init_() {
    var var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_0(var_0);
    return var_0;
}
function jl_IllegalArgumentException__init_0($this) {
    jl_RuntimeException__init_1($this);
}
function nitsg_SWGame$Missile() {
    var a = this; jl_Object.call(a);
    a.$x0 = 0.0;
    a.$y0 = 0;
    a.$v0 = 0.0;
    a.$this$03 = null;
}
function nitsg_SWGame$Missile__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new nitsg_SWGame$Missile();
    nitsg_SWGame$Missile__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function nitsg_SWGame$Missile__init_0($this, var$1, $x, $y, $v) {
    $this.$this$03 = var$1;
    jl_Object__init_0($this);
    $this.$v0 = $v;
    $this.$x0 = $x + 0.5;
    $this.$y0 = $y;
}
function nitsg_SWGame$Missile_move($this) {
    var $ix;
    $this.$clear();
    $this.$y0 = $this.$y0 - 1 | 0;
    $this.$x0 = $this.$x0 + $this.$v0;
    if ($this.$y0 < 0)
        return 0;
    $ix = $this.$x0 | 0;
    if ($ix >= 0 && $ix < $this.$this$03.$X) {
        $this.$this$03.$disp.$put($ix, $this.$y0, $rt_s(42));
        return 1;
    }
    return 0;
}
function nitsg_SWGame$Missile_get_pos($this) {
    return $rt_imul($this.$x0 | 0, $this.$this$03.$Y) + $this.$y0 | 0;
}
function nitsg_SWGame$Missile_clear($this) {
    $this.$this$03.$disp.$put($this.$x0 | 0, $this.$y0, $rt_s(15));
}
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$platformClass = null;
}
function jl_Class__init_(var_0) {
    var var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
}
function jl_Class__init_0($this, $platformClass) {
    var var$2;
    jl_Object__init_0($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
}
function jl_Class_getClass($cls) {
    var $result;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null)
        $result = jl_Class__init_($cls);
    return $result;
}
function jl_Class_getName($this) {
    if ($this.$name0 === null)
        $this.$name0 = otp_Platform_getName($this.$platformClass);
    return $this.$name0;
}
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 0, 3, 0, ["$getClass0", function() { return jl_Object_getClass(this); }, "$toString", function() { return jl_Object_toString(this); }, "$identity", function() { return jl_Object_identity(this); }],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, ["$fillInStackTrace", function() { return jl_Throwable_fillInStackTrace(this); }],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0,
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_IllegalStateException, 0, jl_Exception, [], 0, 3, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0,
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0,
ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0,
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, ["$hasNext", function() { return ju_HashMap$AbstractMapIterator_hasNext(this); }, "$checkConcurrentMod", function() { ju_HashMap$AbstractMapIterator_checkConcurrentMod(this); }, "$makeNext", function() { ju_HashMap$AbstractMapIterator_makeNext(this); }, "$remove", function() { ju_HashMap$AbstractMapIterator_remove(this); }],
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, ["$retainAll", function(var_1) { return ju_AbstractCollection_retainAll(this, var_1); }],
ju_List, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, ["$add1", function(var_1) { return ju_AbstractList_add(this, var_1); }],
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0,
ju_Random, 0, jl_Object, [ji_Serializable], 0, 3, 0, ["$setSeed", function(var_1) { ju_Random_setSeed(this, var_1); }, "$next1", function(var_1) { return ju_Random_next(this, var_1); }, "$nextInt", function() { return ju_Random_nextInt(this); }, "$nextInt0", function(var_1) { return ju_Random_nextInt0(this, var_1); }, "$nextBoolean", function() { return ju_Random_nextBoolean(this); }, "$nextDouble", function() { return ju_Random_nextDouble(this); }],
nitj_JSApp, 0, jl_Object, [], 0, 3, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, jl_Integer_$callClinit, ["$hashCode", function() { return jl_Integer_hashCode(this); }, "$equals", function(var_1) { return jl_Integer_equals(this, var_1); }],
nitc_TerminalGame, 0, jl_Object, [], 3, 3, 0, 0,
juf_Predicate, 0, jl_Object, [], 3, 3, 0, 0,
nitsg_SWGame$missile_x_bomb$lambda$_4_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test1", function(var_1) { return nitsg_SWGame$missile_x_bomb$lambda$_4_0_test(this, var_1); }, "$test", function(var_1) { return nitsg_SWGame$missile_x_bomb$lambda$_4_0_test0(this, var_1); }],
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0,
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
ju_LinkedList$Entry, 0, jl_Object, [], 0, 0, 0, 0,
nitsg_SWGame$missile_x_bomb$lambda$_4_1, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test1", function(var_1) { return nitsg_SWGame$missile_x_bomb$lambda$_4_1_test(this, var_1); }, "$test0", function(var_1) { return nitsg_SWGame$missile_x_bomb$lambda$_4_1_test0(this, var_1); }],
nitsg_SWGame$_move$lambda$_2_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test1", function(var_1) { return nitsg_SWGame$_move$lambda$_2_0_test(this, var_1); }, "$test", function(var_1) { return nitsg_SWGame$_move$lambda$_2_0_test0(this, var_1); }],
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, jl_Character_$callClinit, 0,
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, ["$toString", function() { return jl_Enum_toString(this); }],
nitsg_SWGame$Bomb, 0, jl_Object, [], 0, 0, 0, ["$move1", function() { return nitsg_SWGame$Bomb_move(this); }, "$get_pos", function() { return nitsg_SWGame$Bomb_get_pos(this); }, "$clear", function() { nitsg_SWGame$Bomb_clear(this); }],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0,
ju_Map, 0, jl_Object, [], 3, 3, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0,
nitc_TerminalGame$Status, 0, jl_Enum, [], 12, 3, nitc_TerminalGame$Status_$callClinit, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractSequentialList, 0, ju_AbstractList, [], 1, 3, 0, ["$add", function(var_1, var_2) { ju_AbstractSequentialList_add(this, var_1, var_2); }, "$iterator", function() { return ju_AbstractSequentialList_iterator(this); }],
nitc_EventDriver$Key, 0, jl_Enum, [], 12, 3, nitc_EventDriver$Key_$callClinit, 0,
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0,
jl_String$_clinit_$lambda$_81_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0]);
$rt_metadata([jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$append3", function(var_1) { return jl_AbstractStringBuilder_append(this, var_1); }, "$insert", function(var_1, var_2) { return jl_AbstractStringBuilder_insert(this, var_1, var_2); }, "$append4", function(var_1) { return jl_AbstractStringBuilder_append0(this, var_1); }, "$append2", function(var_1, var_2) { return jl_AbstractStringBuilder_append1(this, var_1, var_2); }, "$insert0", function(var_1, var_2, var_3)
{ return jl_AbstractStringBuilder_insert0(this, var_1, var_2, var_3); }, "$append5", function(var_1) { return jl_AbstractStringBuilder_append2(this, var_1); }, "$insert1", function(var_1, var_2) { return jl_AbstractStringBuilder_insert1(this, var_1, var_2); }, "$ensureCapacity", function(var_1) { jl_AbstractStringBuilder_ensureCapacity(this, var_1); }, "$toString", function() { return jl_AbstractStringBuilder_toString(this); }, "$insertSpace", function(var_1, var_2) { jl_AbstractStringBuilder_insertSpace(this,
var_1, var_2); }],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, ["$append", function(var_1) { return jl_StringBuilder_append1(this, var_1); }, "$append1", function(var_1) { return jl_StringBuilder_append0(this, var_1); }, "$append0", function(var_1) { return jl_StringBuilder_append(this, var_1); }, "$insert2", function(var_1, var_2) { return jl_StringBuilder_insert(this, var_1, var_2); }, "$insert3", function(var_1, var_2) { return jl_StringBuilder_insert0(this, var_1, var_2); }, "$toString", function()
{ return jl_StringBuilder_toString(this); }, "$ensureCapacity", function(var_1) { jl_StringBuilder_ensureCapacity(this, var_1); }, "$insert1", function(var_1, var_2) { return jl_StringBuilder_insert1(this, var_1, var_2); }, "$insert", function(var_1, var_2) { return jl_StringBuilder_insert2(this, var_1, var_2); }],
ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
nitc_DisplayDriver, 0, jl_Object, [], 3, 3, 0, 0,
nitj_JSApp$JSCanvas, 0, jl_Object, [nitc_DisplayDriver], 0, 0, 0, ["$getWidth", function() { return nitj_JSApp$JSCanvas_getWidth(this); }, "$getHeight", function() { return nitj_JSApp$JSCanvas_getHeight(this); }, "$put", function(var_1, var_2, var_3) { nitj_JSApp$JSCanvas_put(this, var_1, var_2, var_3); }, "$msg", function(var_1) { nitj_JSApp$JSCanvas_msg(this, var_1); }, "$log", function(var_1) { nitj_JSApp$JSCanvas_log(this, var_1); }, "$flush", function() { nitj_JSApp$JSCanvas_flush(this); }],
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0,
ju_HashMap$1, 0, ju_AbstractSet, [], 0, 0, 0, ["$iterator", function() { return ju_HashMap$1_iterator(this); }],
ju_HashMap$KeyIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, ["$next0", function() { return ju_HashMap$KeyIterator_next(this); }],
nitc_Utils, 0, jl_Object, [], 0, 3, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, ["$newElementArray", function(var_1) { return ju_HashMap_newElementArray(this, var_1); }, "$computeThreshold", function() { ju_HashMap_computeThreshold(this); }, "$containsKey", function(var_1) { return ju_HashMap_containsKey(this, var_1); }, "$getEntry", function(var_1) { return ju_HashMap_getEntry(this, var_1); }, "$findNonNullKeyEntry", function(var_1, var_2, var_3) { return ju_HashMap_findNonNullKeyEntry(this, var_1, var_2, var_3);
}, "$findNullKeyEntry", function() { return ju_HashMap_findNullKeyEntry(this); }, "$keySet", function() { return ju_HashMap_keySet(this); }, "$put0", function(var_1, var_2) { return ju_HashMap_put(this, var_1, var_2); }, "$putImpl", function(var_1, var_2) { return ju_HashMap_putImpl(this, var_1, var_2); }, "$createHashedEntry", function(var_1, var_2, var_3) { return ju_HashMap_createHashedEntry(this, var_1, var_2, var_3); }, "$rehash0", function(var_1) { ju_HashMap_rehash(this, var_1); }, "$rehash", function()
{ ju_HashMap_rehash0(this); }],
nitsg_SWGame, 0, jl_Object, [nitc_TerminalGame], 0, 3, 0, ["$move0", function(var_1) { return nitsg_SWGame_move(this, var_1); }, "$_move", function() { nitsg_SWGame__move(this); }, "$missile_x_mars", function() { nitsg_SWGame_missile_x_mars(this); }, "$missile_x_bomb", function() { nitsg_SWGame_missile_x_bomb(this); }, "$draw_ship", function(var_1) { nitsg_SWGame_draw_ship(this, var_1); }, "$put_smart", function(var_1, var_2, var_3) { nitsg_SWGame_put_smart(this, var_1, var_2, var_3); }, "$init0", function(var_1,
var_2) { nitsg_SWGame_init(this, var_1, var_2); }, "$log", function(var_1) { nitsg_SWGame_log(this, var_1); }, "$mars_active", function() { return nitsg_SWGame_mars_active(this); }, "$msg", function(var_1) { nitsg_SWGame_msg(this, var_1); }, "$lambda$missile_x_mars$2", function(var_1) { return nitsg_SWGame_lambda$missile_x_mars$2(this, var_1); }],
nitsg_SWGame$Mars, 0, jl_Object, [], 0, 0, 0, ["$move1", function() { return nitsg_SWGame$Mars_move(this); }, "$clear", function() { nitsg_SWGame$Mars_clear(this); }, "$drop_bomb", function() { nitsg_SWGame$Mars_drop_bomb(this); }],
ju_Deque, 0, jl_Object, [ju_Queue], 3, 3, 0, 0,
nitsg_SWGame$missile_x_mars$lambda$_3_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test1", function(var_1) { return nitsg_SWGame$missile_x_mars$lambda$_3_0_test(this, var_1); }, "$test0", function(var_1) { return nitsg_SWGame$missile_x_mars$lambda$_3_0_test0(this, var_1); }],
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, ["$add1", function(var_1) { return ju_HashSet_add(this, var_1); }, "$contains", function(var_1) { return ju_HashSet_contains(this, var_1); }, "$iterator", function() { return ju_HashSet_iterator(this); }],
ju_LinkedList$SequentialListIterator, 0, jl_Object, [ju_ListIterator], 0, 0, 0, ["$hasNext", function() { return ju_LinkedList$SequentialListIterator_hasNext(this); }, "$next0", function() { return ju_LinkedList$SequentialListIterator_next(this); }, "$remove", function() { ju_LinkedList$SequentialListIterator_remove(this); }, "$hasPrevious", function() { return ju_LinkedList$SequentialListIterator_hasPrevious(this); }, "$add0", function(var_1) { ju_LinkedList$SequentialListIterator_add(this, var_1); }, "$checkConcurrentModification",
function() { ju_LinkedList$SequentialListIterator_checkConcurrentModification(this); }],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, jl_String_$callClinit, ["$charAt", function(var_1) { return jl_String_charAt(this, var_1); }, "$length0", function() { return jl_String_length(this); }, "$isEmpty", function() { return jl_String_isEmpty(this); }, "$substring0", function(var_1, var_2) { return jl_String_substring(this, var_1, var_2); }, "$substring", function(var_1) { return jl_String_substring0(this, var_1); }, "$toString", function() { return jl_String_toString(this);
}, "$equals", function(var_1) { return jl_String_equals(this, var_1); }, "$hashCode", function() { return jl_String_hashCode(this); }],
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0,
ju_LinkedList, 0, ju_AbstractSequentialList, [ju_Deque], 0, 3, 0, ["$size", function() { return ju_LinkedList_size(this); }, "$clear", function() { ju_LinkedList_clear(this); }, "$listIterator0", function() { return ju_LinkedList_listIterator(this); }, "$listIterator", function(var_1) { return ju_LinkedList_listIterator0(this, var_1); }, "$removeEntry", function(var_1) { ju_LinkedList_removeEntry(this, var_1); }],
ju_NoSuchElementException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
nitsa_SWJSApp, 0, jl_Object, [], 0, 3, nitsa_SWJSApp_$callClinit, 0,
nitsg_SWGame$_move$lambda$_2_1, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test1", function(var_1) { return nitsg_SWGame$_move$lambda$_2_1_test(this, var_1); }, "$test0", function(var_1) { return nitsg_SWGame$_move$lambda$_2_1_test0(this, var_1); }],
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
nitsg_SWGame$Missile, 0, jl_Object, [], 0, 0, 0, ["$move1", function() { return nitsg_SWGame$Missile_move(this); }, "$get_pos", function() { return nitsg_SWGame$Missile_get_pos(this); }, "$clear", function() { nitsg_SWGame$Missile_clear(this); }],
jl_Class, 0, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, ["$getName", function() { return jl_Class_getName(this); }]]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["@", "init", "move", "dispatch(", ") : not implemented", "", "Space", "ArrowRight", "ArrowLeft", "Key ", " isn\'t handled", "o", "Something\'s off, humans count changed from ", " to ", "One less human, sorry", " ", "0", "CONT", "WIN", "LOSE", "Q", "P", "ESC", "LEFT", "RIGHT", "SPC", "null", "[MSG] ", "(****)", "/***\\", "\\***/", "Speed ", "SWGame: X = ", ", Y = ", "\\o/", "O", "J L", "Starting the game!", "| Ships: ", "; Humans: ", "...", "Yey, one less ship!", "^"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
function Long_eq(a, b) {
    return a.hi === b.hi && a.lo === b.lo;
}
function Long_ne(a, b) {
    return a.hi !== b.hi || a.lo !== b.lo;
}
function Long_gt(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x > y;
    }
    return (a.lo & 1) > (b.lo & 1);
}
function Long_ge(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x >= y;
    }
    return (a.lo & 1) >= (b.lo & 1);
}
function Long_lt(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x < y;
    }
    return (a.lo & 1) < (b.lo & 1);
}
function Long_le(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x <= y;
    }
    return (a.lo & 1) <= (b.lo & 1);
}
function Long_add(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo + b.lo);
    } else if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo + b_lolo | 0;
    var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_inc(a) {
    var lo = a.lo + 1 | 0;
    var hi = a.hi;
    if (lo === 0) {
        hi = hi + 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_dec(a) {
    var lo = a.lo - 1 | 0;
    var hi = a.hi;
    if (lo ===  -1) {
        hi = hi - 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_neg(a) {
    return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
}
function Long_sub(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo - b.lo);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo - b_lolo | 0;
    var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_compare(a, b) {
    var r = a.hi - b.hi;
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
function Long_mul(a, b) {
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = 0;
    var lohi = 0;
    var hilo = 0;
    var hihi = 0;
    lolo = a_lolo * b_lolo | 0;
    lohi = lolo >>> 16;
    lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    hihi = hilo >>> 16;
    hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
    var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
    return positive ? result : Long_neg(result);
}
function Long_div(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_divRem(a, b))[0];
}
function Long_udiv(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[0];
}
function Long_rem(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
    }
    return (Long_divRem(a, b))[1];
}
function Long_urem(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[1];
}
function Long_divRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
}
function Long_udivRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return [q, a];
}
function Long_shiftLeft16(a) {
    return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
}
function Long_shiftRight16(a) {
    return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
}
function Long_and(a, b) {
    return new Long(a.lo & b.lo, a.hi & b.hi);
}
function Long_or(a, b) {
    return new Long(a.lo | b.lo, a.hi | b.hi);
}
function Long_xor(a, b) {
    return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
}
function Long_shl(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
    } else if (b === 32) {
        return new Long(0, a.lo);
    } else {
        return new Long(0, a.lo << b - 32);
    }
}
function Long_shr(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
    } else if (b === 32) {
        return new Long(a.hi, a.hi >> 31);
    } else {
        return new Long(a.hi >> b - 32, a.hi >> 31);
    }
}
function Long_shru(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
    } else if (b === 32) {
        return new Long(a.hi, 0);
    } else {
        return new Long(a.hi >>> b - 32, 0);
    }
}
function LongInt(lo, hi, sup) {
    this.lo = lo;
    this.hi = hi;
    this.sup = sup;
}
function LongInt_mul(a, b) {
    var a_lolo = (a.lo & 0xFFFF) * b | 0;
    var a_lohi = (a.lo >>> 16) * b | 0;
    var a_hilo = (a.hi & 0xFFFF) * b | 0;
    var a_hihi = (a.hi >>> 16) * b | 0;
    var sup = a.sup * b | 0;
    a_lohi = a_lohi + (a_lolo >>> 16) | 0;
    a_hilo = a_hilo + (a_lohi >>> 16) | 0;
    a_hihi = a_hihi + (a_hilo >>> 16) | 0;
    sup = sup + (a_hihi >>> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup & 0xFFFF;
}
function LongInt_sub(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo - b_lolo | 0;
    a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_add(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo + b_lolo | 0;
    a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_inc(a) {
    a.lo = a.lo + 1 | 0;
    if (a.lo === 0) {
        a.hi = a.hi + 1 | 0;
        if (a.hi === 0) {
            a.sup = a.sup + 1 & 0xFFFF;
        }
    }
}
function LongInt_dec(a) {
    a.lo = a.lo - 1 | 0;
    if (a.lo ===  -1) {
        a.hi = a.hi - 1 | 0;
        if (a.hi ===  -1) {
            a.sup = a.sup - 1 & 0xFFFF;
        }
    }
}
function LongInt_ucompare(a, b) {
    var r = a.sup - b.sup;
    if (r !== 0) {
        return r;
    }
    r = (a.hi >>> 1) - (b.hi >>> 1);
    if (r !== 0) {
        return r;
    }
    r = (a.hi & 1) - (b.hi & 1);
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function LongInt_numOfLeadingZeroBits(a) {
    var n = 0;
    var d = 16;
    while (d > 0) {
        if (a >>> d !== 0) {
            a >>>= d;
            n = n + d | 0;
        }
        d = d / 2 | 0;
    }
    return 31 - n;
}
function LongInt_shl(a, b) {
    if (b === 0) {
        return;
    }
    if (b < 32) {
        a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
        a.hi = a.lo >>> 32 - b | a.hi << b;
        a.lo <<= b;
    } else if (b === 32) {
        a.sup = a.hi & 0xFFFF;
        a.hi = a.lo;
        a.lo = 0;
    } else if (b < 64) {
        a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
        a.hi = a.lo << b;
        a.lo = 0;
    } else if (b === 64) {
        a.sup = a.lo & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    } else {
        a.sup = a.lo << b - 64 & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    }
}
function LongInt_shr(a, b) {
    if (b === 0) {
        return;
    }
    if (b === 32) {
        a.lo = a.hi;
        a.hi = a.sup;
        a.sup = 0;
    } else if (b < 32) {
        a.lo = a.lo >>> b | a.hi << 32 - b;
        a.hi = a.hi >>> b | a.sup << 32 - b;
        a.sup >>>= b;
    } else if (b === 64) {
        a.lo = a.sup;
        a.hi = 0;
        a.sup = 0;
    } else if (b < 64) {
        a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
        a.hi = a.sup >>> b - 32;
        a.sup = 0;
    } else {
        a.lo = a.sup >>> b - 64;
        a.hi = 0;
        a.sup = 0;
    }
}
function LongInt_copy(a) {
    return new LongInt(a.lo, a.hi, a.sup);
}
function LongInt_div(a, b) {
    var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
    var sz = 1 + (bits / 16 | 0);
    var dividentBits = bits % 16;
    LongInt_shl(b, bits);
    LongInt_shl(a, dividentBits);
    var q = new LongInt(0, 0, 0);
    while (sz-- > 0) {
        LongInt_shl(q, 16);
        var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
        var digitB = b.hi >>> 16;
        var digit = digitA / digitB | 0;
        var t = LongInt_copy(b);
        LongInt_mul(t, digit);
        if (LongInt_ucompare(t, a) >= 0) {
            while (LongInt_ucompare(t, a) > 0) {
                LongInt_sub(t, b);
                 --digit;
            }
        } else {
            while (true) {
                var nextT = LongInt_copy(t);
                LongInt_add(nextT, b);
                if (LongInt_ucompare(nextT, a) > 0) {
                    break;
                }
                t = nextT;
                ++digit;
            }
        }
        LongInt_sub(a, t);
        q.lo |= digit;
        LongInt_shl(a, 16);
    }
    LongInt_shr(a, bits + 16);
    return q;
}
function $rt_startThread(runner, callback) {
    var result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof Error) {
        throw result;
    }
}
function $rt_suspending() {
    return false;
}
function $rt_resuming() {
    return false;
}
function $rt_nativeThread() {
    return null;
}
function $rt_invalidPointer() {
}
starwars_dispatch = $rt_mainStarter(nitsa_SWJSApp_main);
})();
