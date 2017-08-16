﻿import SuperMap from '../SuperMap';
import SpatialAnalystBase from './SpatialAnalystBase';
import DatasetThiessenAnalystParameters from './DatasetThiessenAnalystParameters';
import GeometryThiessenAnalystParameters from './GeometryThiessenAnalystParameters';
import GeoJSON from '../format/GeoJSON';

/**
 * @class SuperMap.ThiessenAnalystService
 * @classdesc
 * 泰森多边形分析服务类
 * 该类负责将客户设置的泰森多边形分析参数传递给服务端，并接收服务端返回的分析结果数据。
 * 泰森多边形分析结果通过该类支持的事件的监听函数参数获取
 * 泰森多边形分析的参数支持两种，当参数为 {SuperMap.DatasetThiessenAnalystParameters} 类型
 * 时，执行数据集泰森多边形分析，当参数为 {SuperMap.GeometryThiessenAnalystParameters} 类型时，
 * 执行几何对象泰森多边形分析。
 * @param options - {Object} 参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @param url - {string} 服务的访问地址。
 * 如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 *
 * @extends SuperMap.SpatialAnalystBase
 * @example 例如：
 * (start code)
 * var myThiessenAnalystService = new SuperMap.ThiessenAnalystService(url, {
     *     eventListeners: {
     *           "processCompleted": bufferCompleted,
     *           "processFailed": bufferFailed
     *           }
     *    });
 * (end)
 *
 */
export default  class ThiessenAnalystService extends SpatialAnalystBase {
    /**
     * @member SuperMap.ThiessenAnalystService.prototype.mode -{string}
     * @description 缓冲区分析类型
     */
    mode = null;

    constructor(url, options) {
        super(url, options);
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }

    /**
     * @function SuperMap.ThiessenAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param parameter - {SuperMap.DatasetThiessenAnalystParameters}/{GeometryThiessenAnalystParameters}
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        if (parameter instanceof DatasetThiessenAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.dataset + '/thiessenpolygon';
            DatasetThiessenAnalystParameters.toObject(parameter, parameterObject);
        }
        else if (parameter instanceof GeometryThiessenAnalystParameters) {
            me.mode = "geometry";
            me.url += 'geometry/thiessenpolygon';
            GeometryThiessenAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = SuperMap.Util.toJSON(parameterObject);


        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.ThiessenAnalystService.prototype.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult(result) {
        if (!result) {
            return result;
        }

        result = super.toGeoJSONResult(result);
        if (result.regions) {
            var geoJSONFormat = new GeoJSON();
            result.regions = JSON.parse(geoJSONFormat.write(result.regions));
        }
        return result;
    }

    CLASS_NAME = "SuperMap.ThiessenAnalystService"
}

SuperMap.ThiessenAnalystService = ThiessenAnalystService;