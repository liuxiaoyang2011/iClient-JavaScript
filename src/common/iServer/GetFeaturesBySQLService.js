﻿/**
 * Class: SuperMap.REST.GetFeaturesBySQLService
 * 数据服务中数据集 SQL 查询服务类。
 * 在一个或多个指定的图层上查询符合 SQL 条件的空间地物信息。
 * 
 * Inherits from:
 *  - <SuperMap.REST.GetFeaturesServiceBase>
 */
require('./GetFeaturesServiceBase');
require('./GetFeaturesBySQLParameters');
SuperMap.REST.GetFeaturesBySQLService = SuperMap.Class(SuperMap.REST.GetFeaturesServiceBase, {

    /**
     * Constructor: SuperMap.REST.GetFeaturesBySQLService
     * SQL 查询服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var myGetFeaturesBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
     *     eventListeners: {
     *         "processCompleted": GetFeaturesCompleted, 
     *         "processFailed": GetFeaturesError
     *         }
     * });
     * function getFeaturesCompleted(object){//todo};
     * function getFeaturesError(object){//todo};
     * (end)
     *
     * Parameters:
     * url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.REST.GetFeaturesServiceBase.prototype.initialize.apply(this, arguments);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.REST.GetFeaturesServiceBase.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: getJsonParameters
     * 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（ID, SQL, Buffer, Geometry等）。
     *
     * Parameters:
     * params - {<SuperMap.GetFeaturesBySQLParameters>}
     *
     * Returns:
     * {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters: function(params) {
        return  SuperMap.GetFeaturesBySQLParameters.toJsonParameters(params);
    },
    
    CLASS_NAME: "SuperMap.REST.GetFeaturesBySQLService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.GetFeaturesBySQLService(url, options);
};