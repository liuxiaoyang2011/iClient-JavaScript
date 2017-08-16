﻿import  SuperMap from '../SuperMap';import TransportationAnalystResultSetting from './TransportationAnalystResultSetting';/** * @class SuperMap.TransportationAnalystParameter * @classdesc 交通网络分析通用参数类。 * 该类主要用来提供交通网络分析所需的通用参数。 * 通过本类可以设置障碍边、障碍点、权值字段信息的名称标识、转向权值字段等信息，还可以对分析结果包含的内容进行一些设置。 * @param options - {Object} 可选参数。如:</br> *        barrierEdgeIDs - {Array(Number)} 网络分析中障碍弧段的 ID 数组。 *        barrierNodeIDs - {Array(Number)} 网络分析中障碍点的 ID 数组。 *        barrierPoints - {Array(Point)} *        weightFieldName - {string} 阻力字段的名称。 *        turnWeightField - {string} 转向权重字段的名称。 *        resultSetting - {SuperMap.TransportationAnalystResultSetting} 分析结果返回内容。 */export default  class TransportationAnalystParameter {    /**     * @member SuperMap.TransportationAnalystParameter.prototype.barrierEdgeIDs -{Array(Number)}     * @description 网络分析中障碍弧段的 ID 数组。弧段设置为障碍边之后，表示双向都不通。     */    barrierEdgeIDs = null;    /**     * @member SuperMap.TransportationAnalystParameter.prototype.v -{Array(Number)}     * @description 网络分析中障碍点的 ID 数组。结点设置为障碍点之后，表示任何方向都不能通过此结点。     */    barrierNodeIDs = null;    /**     * @member SuperMap.TransportationAnalystParameter.prototype.barrierPoints -{Array(Point)}     * @description 网络分析中 Point2D 类型的障碍点数组。障碍点表示任何方向都不能通过此点。     * 当各网络分析参数类中的 isAnalyzeById 属性设置为 false 时，该属性才生效。     */    barrierPoints = null;    /**     * @member SuperMap.TransportationAnalystParameter.prototype.weightFieldName -{string}     * @description 阻力字段的名称，标识了进行网络分析时所使用的阻力字段，例如表示时间、长度等的字段都可以用作阻力字段。     * 该字段默值为服务器发布的所有耗费字段的第一个字段。     */    weightFieldName = null;    /**     * @member SuperMap.TransportationAnalystParameter.prototype.turnWeightField -{string}     * @description 转向权重字段的名称。     */    turnWeightField = null;    /**     *  @member SuperMap.TransportationAnalystParameter.prototype.resultSetting -{SuperMap.TransportationAnalystResultSetting}     *  @description 分析结果返回内容。     */    resultSetting = null;    constructor(options) {        var me = this;        me.resultSetting = new TransportationAnalystResultSetting();        if (!options) {            return;        }        SuperMap.Util.extend(this, options);    }    /**     * @function SuperMap.TransportationAnalystParameter.prototype.destroy     * @description 释放资源，将引用资源的属性置空。     */    destroy() {        var me = this;        me.barrierEdgeIDs = null;        me.barrierNodeIDs = null;        me.weightFieldName = null;        me.turnWeightField = null;        if (me.resultSetting) {            me.resultSetting.destroy();            me.resultSetting = null;        }        if (me.barrierPoints && me.barrierPoints.length) {            for (var i in me.barrierPoints) {                me.barrierPoints.destroy();            }        }        me.barrierPoints = null;    }    CLASS_NAME = "SuperMap.TransportationAnalystParameter"}SuperMap.TransportationAnalystParameter = TransportationAnalystParameter;