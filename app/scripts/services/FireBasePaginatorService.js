define([
    'angular', 
    'config'
], function(angular, appConfig) {

    function PaginatorService($q, $auth, $firebase, $timeout) {

        function Paginator(ref, limit) {
            this.ref = ref;
            this.pageNumber = 0;
            this.limit = limit;
            this.lastPageNumber = null;
            this.currentSet = {};
        }

        function getLastKey (obj) {
            var key;
            if (obj) {
                each(obj, function (v, k) {
                    key = k;
                });
            }
            return key;
        }

        function getFirstKey(obj) {
            var key;
            if (obj) {
                each(obj, function (v, k) {
                    key = k;
                    return true;
                });
            }
            return key;
        }

        function dropFirst(obj) {
            if (obj) {
                delete obj[getFirstKey(obj)];
            }
            return obj;
        }

        function dropLast(obj) {
            if (obj) {
                delete obj[getLastKey(obj)];
            }
            return obj;
        }

        function map(obj, cb) {
            var out = [];
            each(obj, function (v, k) {
                out.push(cb(v, k));
            });
            return out;
        }

        function each(obj, cb) {
            if (obj) {
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        var res = cb(obj[k], k);
                        if (res === true) {
                            break;
                        }
                    }
                }
            }
        }

        function size(obj) {
            var i = 0;
            each(obj, function () {
                i++;
            });
            return i;
        }

        Paginator.prototype = {
            nextPage: function (callback) {
                if( this.isLastPage() ) {
                    callback(this.currentSet);    
                }
                else {
                    var lastKey = getLastKey(this.currentSet);
                    // if there is no last key, we need to use undefined as priority
                    var pri = lastKey ? null : undefined;
                    this.ref.startAt(pri, lastKey)
                        .limit(this.limit + (lastKey? 1 : 0))
                        .once('value', this._process.bind(this, {
                            cb: callback,
                            dir: 'next',
                            key: lastKey
                        }));
                }
            },

            prevPage: function (callback) {
                console.log('prevPage', this.isFirstPage(), this.pageNumber);
                if( this.isFirstPage() ) {
                    callback(this.currentSet);    
                }
                else {
                    var firstKey = getFirstKey(this.currentSet);
                    // if there is no last key, we need to use undefined as priority
                    this.ref.endAt(null, firstKey)
                        .limit(this.limit+1)
                        .once('value', this._process.bind(this, {
                            cb: callback,
                            dir: 'prev',
                            key: firstKey
                        }));
                }
            },

            isFirstPage: function () {
                return this.pageNumber === 1;
            },

            isLastPage: function () {
                return this.pageNumber === this.lastPageNumber;
            },

            _process: function (opts, snap) {
                var vals = snap.val(), len = size(vals);
                console.log('_process', opts, len, this.pageNumber, vals);
                if( len < this.limit ) {
                    // if the next page returned some results, it becomes the last page
                    // otherwise this one is
                    this.lastPageNumber = this.pageNumber + (len > 0? 1 : 0);   
                }
                if (len === 0) {
                    // we don't know if this is the last page until
                    // we try to fetch the next, so if the next is empty
                    // then do not advance
                    opts.cb(this.currentSet);
                }
                else {
                    if (opts.dir === 'next') {
                        this.pageNumber++;
                        if (opts.key) {
                            dropFirst(vals);
                        }
                    } else {
                        this.pageNumber--;
                        if (opts.key) {
                            dropLast(vals);
                        }
                    }
                    this.currentSet = vals;
                    opts.cb(vals);
                }

            }
        };

        return {

            initPaginator : function(ref, limit) {
                return new Paginator(ref, limit);
            }
        };

    }


    return PaginatorService;
});